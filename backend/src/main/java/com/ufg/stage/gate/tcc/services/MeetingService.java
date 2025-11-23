package com.ufg.stage.gate.tcc.services;

import com.ufg.stage.gate.tcc.models.dtos.CreateMeetingDTO;
import com.ufg.stage.gate.tcc.models.dtos.CreateMeetingReportDTO;
import com.ufg.stage.gate.tcc.models.dtos.MeetingDTO;
import com.ufg.stage.gate.tcc.models.dtos.TimeSlotDTO;
import com.ufg.stage.gate.tcc.models.entities.*;
import com.ufg.stage.gate.tcc.models.enums.GateNameEnum;
import com.ufg.stage.gate.tcc.models.enums.GateResultEnum;
import com.ufg.stage.gate.tcc.models.enums.MeetingStatusEnum;
import com.ufg.stage.gate.tcc.models.enums.MeetingTypeEnum;
import com.ufg.stage.gate.tcc.models.enums.ProjectStatusEnum;
import com.ufg.stage.gate.tcc.repositories.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final GateRepository gateRepository;
    private final MeetingReportRepository meetingReportRepository;
    private final RecurrentTimeSlotRepository timeSlotRepository;

    public MeetingService(MeetingRepository meetingRepository, ProjectRepository projectRepository, UserRepository userRepository, GateRepository gateRepository, MeetingReportRepository meetingReportRepository, RecurrentTimeSlotRepository timeSlotRepository) {
        this.meetingRepository = meetingRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.gateRepository = gateRepository;
        this.meetingReportRepository = meetingReportRepository;
        this.timeSlotRepository = timeSlotRepository;
    }

    public List<MeetingDTO> findMeetingsByProjectId(String projectId) {
        return meetingRepository.findByProjectId(UUID.fromString(projectId)).stream()
                .map(MeetingDTO::fromEntity)
                .sorted(Comparator.comparing(MeetingDTO::getScheduleDate).reversed())
                .collect(Collectors.toList());
    }

    @SneakyThrows
    @Transactional
    public MeetingDTO createMeeting(String projectId, CreateMeetingDTO createMeetingDTO) {
        var professorTimeSlot = timeSlotRepository.findById(UUID.fromString(createMeetingDTO.getTimeSlotId()))
                .orElseThrow(() -> new EntityNotFoundException("Professor TimeSlot not found"));

        var project = projectRepository.findById(UUID.fromString(projectId))
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        var projectGates = gateRepository.findAllByProjectId(project.getId());

        var currentGate = projectGates.stream()
                .filter(g -> !g.isApproved())
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("No unapproved gate found for this project."));

        validateMinimumDifferentApproverProfessors(createMeetingDTO, projectGates, professorTimeSlot.getProfessor(), currentGate);
        validateScheduleTime(createMeetingDTO, professorTimeSlot);

        Meeting meeting = new Meeting();
        meeting.setProject(project);
        meeting.setProfessor(professorTimeSlot.getProfessor());
        meeting.setScheduleDate(createMeetingDTO.getScheduleDate());
        meeting.setStartTime(professorTimeSlot.getStartTime());
        meeting.setEndTime(professorTimeSlot.getEndTime());
        meeting.setType(createMeetingDTO.getType());
        meeting.setStatus(MeetingStatusEnum.SCHEDULED);
        meeting.setStageGateNumber(currentGate.getNumber());

        Meeting savedMeeting = meetingRepository.save(meeting);

        return MeetingDTO.fromEntity(savedMeeting);
    }

    @Transactional
    public MeetingDTO createMeetingReport(String meetingId, CreateMeetingReportDTO reportDTO) {
        var meeting = meetingRepository.findById(UUID.fromString(meetingId))
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found"));

        if (meeting.getReport() != null) {
            throw new IllegalStateException("This meeting already has a report.");
        }

        var participants = userRepository.findAllById(reportDTO.getParticipantIds().stream().map(UUID::fromString).collect(Collectors.toList()));
        meeting.setParticipants(Set.copyOf(participants));

        MeetingReport report = new MeetingReport();
        report.setFeedback(reportDTO.getFeedback());
        report.setReportDate(LocalDateTime.now());
        report.setMeeting(meeting);

        if (meeting.getType() == MeetingTypeEnum.GATE) {
            if (reportDTO.getGateResult() == null) {
                throw new IllegalArgumentException("Gate result is required for meetings of type GATE.");
            }
            report.setGateResult(reportDTO.getGateResult());

            if (reportDTO.getGateResult() == GateResultEnum.APPROVED) {
                var gate = updateApprovedGate(meeting);
                createNextGateOrFinishProject(meeting, gate);
            }
        }

        meetingReportRepository.save(report);
        meeting.setStatus(MeetingStatusEnum.COMPLETED);
        meeting.setReport(report);

        Meeting updatedMeeting = meetingRepository.save(meeting);
        return MeetingDTO.fromEntity(updatedMeeting);
    }

    public MeetingDTO cancelMeeting(String meetingId) {
        Meeting meeting = meetingRepository.findById(UUID.fromString(meetingId))
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found"));

        if (meeting.getStatus() == MeetingStatusEnum.CANCELLED) {
            throw new IllegalStateException("This meeting is already cancelled.");
        }

        if (meeting.getStatus() == MeetingStatusEnum.COMPLETED) {
            throw new IllegalStateException("This meeting has already been completed.");
        }

        meeting.setStatus(MeetingStatusEnum.CANCELLED);
        Meeting updatedMeeting = meetingRepository.save(meeting);

        return MeetingDTO.fromEntity(updatedMeeting);
    }

    public List<Meeting> findOverdueMeetingsWithoutReport() {
        LocalDateTime twentyFourHoursAgo = LocalDateTime.now().minusHours(24);
        return meetingRepository.findMeetingsWithProfessorByStatusAndScheduleDateBeforeAndReportIsNull(MeetingStatusEnum.SCHEDULED, twentyFourHoursAgo);
    }

    public List<TimeSlotDTO> findTimeSlotsForDate(LocalDate startDate, LocalDate endDate) {
        var timeSlots = timeSlotRepository.findAll();
        var timeSlotsDtos = new ArrayList<TimeSlotDTO>();
        for (LocalDate i = startDate; i.isBefore(endDate) || i.isEqual(endDate); i = i.plusDays(1)) {
            LocalDate finalI = i;
            var timeSlotsForDay = timeSlots.stream()
                    .filter(ts -> ts.getDayOfWeek().equals(finalI.getDayOfWeek()))
                    .toList();
            for (RecurrentTimeSlot timeSlot : timeSlotsForDay) {
                timeSlotsDtos.add(new TimeSlotDTO(timeSlot, finalI));
            }
        }
        var meetingsInRange = meetingRepository.findAllByScheduleDateBetweenAndStatus(startDate, endDate, MeetingStatusEnum.SCHEDULED);
        
        for (TimeSlotDTO timeSlotDto : timeSlotsDtos) {
            for (Meeting meeting : meetingsInRange) {
                if (meeting.getScheduleDate().equals(timeSlotDto.getScheduleDate()) 
                        && meeting.getStartTime().equals(timeSlotDto.getStartTime())) {
                    timeSlotDto.setAvailable(false);
                    break;
                }
            }
        }
        return timeSlotsDtos;
    }

    private void createNextGateOrFinishProject(Meeting meeting, Gate gate) {
        short currentGateNumber = gate.getNumber();
        if (currentGateNumber < 6) {
            Gate newGate = new Gate();
            short nextGateNumber = (short) (currentGateNumber + 1);
            newGate.setProject(meeting.getProject());
            newGate.setNumber(nextGateNumber);
            newGate.setName(GateNameEnum.valueOf("GATE_" + nextGateNumber));
            gateRepository.save(newGate);
        } else if (currentGateNumber == 6) {
            var project = meeting.getProject();
            project.setStatus(ProjectStatusEnum.COMPLETED);
            projectRepository.save(project);
        }
    }

    private Gate updateApprovedGate(Meeting meeting) {
        var gate = gateRepository
                .findByProjectIdAndNumber(meeting.getProject().getId(), meeting.getStageGateNumber())
                .orElseThrow(() -> new EntityNotFoundException("Associated gate not found."));
        gate.setApproved(true);
        gate.setApproverProfessor(meeting.getProfessor());
        gateRepository.save(gate);
        return gate;
    }

    @SneakyThrows
    private void validateMinimumDifferentApproverProfessors(CreateMeetingDTO createMeetingDTO, List<Gate> projectGates, User professor, Gate currentGate) {
        if (createMeetingDTO.getType() == MeetingTypeEnum.GATE) {
            var distinctApproverProfessors = projectGates.stream()
                    .filter(Gate::isApproved)
                    .map(Gate::getApproverProfessor)
                    .distinct()
                    .toList();

            var maxDifferentProfessors = distinctApproverProfessors.size();
            if (!distinctApproverProfessors.contains(professor)) {
                maxDifferentProfessors++;
            }

            maxDifferentProfessors += (6 - currentGate.getNumber());

            if (maxDifferentProfessors < 3) {
                throw new Exception("Cannot the gate meeting because it would not have the minimum of 3 different professors by the end of all gates");
            }
        }
    }

    private void validateScheduleTime(CreateMeetingDTO createMeetingDTO, RecurrentTimeSlot timeSlot) {
        if (createMeetingDTO.getScheduleDate().isBefore(LocalDateTime.now().toLocalDate())) {
            throw new IllegalArgumentException("Schedule date cannot be in the past.");
        }

        var existingMeeting = meetingRepository.findByProfessorIdAndScheduleDateAndStartTimeAndStatus(timeSlot.getProfessor().getId(), createMeetingDTO.getScheduleDate(), timeSlot.getStartTime(), MeetingStatusEnum.SCHEDULED);
        if (existingMeeting != null) {
            throw new IllegalArgumentException("Cannot schedule meeting because the time slot is already scheduled");
        }
    }
}
