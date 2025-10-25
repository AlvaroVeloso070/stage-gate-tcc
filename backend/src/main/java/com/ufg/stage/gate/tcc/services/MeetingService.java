package com.ufg.stage.gate.tcc.services;

import com.ufg.stage.gate.tcc.models.dtos.CreateMeetingDTO;
import com.ufg.stage.gate.tcc.models.dtos.CreateMeetingReportDTO;
import com.ufg.stage.gate.tcc.models.dtos.MeetingDTO;
import com.ufg.stage.gate.tcc.models.entities.Gate;
import com.ufg.stage.gate.tcc.models.entities.Meeting;
import com.ufg.stage.gate.tcc.models.entities.MeetingReport;
import com.ufg.stage.gate.tcc.models.enums.GateNameEnum;
import com.ufg.stage.gate.tcc.models.enums.GateResultEnum;
import com.ufg.stage.gate.tcc.models.enums.MeetingStatusEnum;
import com.ufg.stage.gate.tcc.models.enums.MeetingTypeEnum;
import com.ufg.stage.gate.tcc.models.enums.ProjectStatusEnum;
import com.ufg.stage.gate.tcc.repositories.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final GateRepository gateRepository;
    private final MeetingReportRepository meetingReportRepository;

    public MeetingService(MeetingRepository meetingRepository, ProjectRepository projectRepository, UserRepository userRepository, GateRepository gateRepository, MeetingReportRepository meetingReportRepository) {
        this.meetingRepository = meetingRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.gateRepository = gateRepository;
        this.meetingReportRepository = meetingReportRepository;
    }

    public List<MeetingDTO> findMeetingsByProjectId(String projectId) {
        return meetingRepository.findByProjectId(UUID.fromString(projectId)).stream()
                .map(MeetingDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public MeetingDTO createMeeting(String projectId, CreateMeetingDTO createMeetingDTO) {
        var project = projectRepository.findById(UUID.fromString(projectId))
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        var professor = userRepository.findById(UUID.fromString(createMeetingDTO.getProfessorId()))
                .orElseThrow(() -> new EntityNotFoundException("Professor not found"));

        var currentGate = gateRepository.findFirstByProjectIdAndIsApprovedFalseOrderByNumberAsc(project.getId())
                .orElseThrow(() -> new IllegalStateException("No open gates found for this project"));

        Meeting meeting = new Meeting();
        meeting.setProject(project);
        meeting.setProfessor(professor);
        meeting.setScheduleDate(createMeetingDTO.getScheduleDate());
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
                var gate = gateRepository.findByProjectIdAndNumber(meeting.getProject().getId(), meeting.getStageGateNumber())
                        .orElseThrow(() -> new EntityNotFoundException("Associated gate not found."));
                gate.setApproved(true);
                gateRepository.save(gate);

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
}
