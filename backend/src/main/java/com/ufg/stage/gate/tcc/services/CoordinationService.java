package com.ufg.stage.gate.tcc.services;

import com.ufg.stage.gate.tcc.models.dtos.MeetingCoordinationDTO;
import com.ufg.stage.gate.tcc.models.dtos.ProjectGateMetricsDTO;
import com.ufg.stage.gate.tcc.models.entities.Gate;
import com.ufg.stage.gate.tcc.models.entities.Meeting;
import com.ufg.stage.gate.tcc.models.enums.MeetingStatusCoordinationEnum;
import com.ufg.stage.gate.tcc.models.enums.MeetingStatusEnum;
import com.ufg.stage.gate.tcc.models.enums.ProjectStatusEnum;
import com.ufg.stage.gate.tcc.repositories.GateRepository;
import com.ufg.stage.gate.tcc.repositories.MeetingRepository;
import com.ufg.stage.gate.tcc.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CoordinationService {

    private final GateRepository gateRepository;
    private final ProjectRepository projectRepository;
    private final MeetingRepository meetingRepository;

    public CoordinationService(
            GateRepository gateRepository,
            ProjectRepository projectRepository,
            MeetingRepository meetingRepository
    ) {
        this.gateRepository = gateRepository;
        this.projectRepository = projectRepository;
        this.meetingRepository = meetingRepository;
    }

    public ProjectGateMetricsDTO getProjectGateMetrics() {
        List<Gate> openGates = gateRepository.findAllByIsApprovedFalseAndProjectStatus(ProjectStatusEnum.IN_PROGRESS);

        Map<Object, Optional<Gate>> projectsCurrentGateMap = openGates.stream()
                .collect(Collectors.groupingBy(gate -> gate.getProject().getId(),
                        Collectors.minBy(java.util.Comparator.comparing(Gate::getNumber))
                ));

        Collection<Gate> currentGates = projectsCurrentGateMap.values().stream()
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();

        Map<Short, Long> countsByGate = currentGates.stream()
                .collect(Collectors.groupingBy(Gate::getNumber, Collectors.counting()));

        long lateProjectsCount = currentGates.stream()
                .filter(gate -> gate.getDueDate() != null && gate.getDueDate().isBefore(LocalDate.now()))
                .count();

        long almostLateProjectsCount = currentGates.stream()
                .filter(gate -> gate.getDueDate() != null && ChronoUnit.DAYS.between(LocalDate.now(), gate.getDueDate()) <= 7)
                .count();

        long completedProjectsCount = projectRepository.countByStatus(ProjectStatusEnum.COMPLETED);
        long cancelledProjectsCount = projectRepository.countByStatus(ProjectStatusEnum.CANCELLED);

        ProjectGateMetricsDTO metrics = new ProjectGateMetricsDTO();
        metrics.setProjectsInGate1(countsByGate.getOrDefault((short)1, 0L));
        metrics.setProjectsInGate2(countsByGate.getOrDefault((short)2, 0L));
        metrics.setProjectsInGate3(countsByGate.getOrDefault((short)3, 0L));
        metrics.setProjectsInGate4(countsByGate.getOrDefault((short)4, 0L));
        metrics.setProjectsInGate5(countsByGate.getOrDefault((short)5, 0L));
        metrics.setProjectsInGate6(countsByGate.getOrDefault((short)6, 0L));
        metrics.setLateProjects(lateProjectsCount);
        metrics.setAlmostLateProjects(almostLateProjectsCount);
        metrics.setCompletedProjects(completedProjectsCount);
        metrics.setCancelledProjects(cancelledProjectsCount);
        metrics.setInProgressProjects(openGates.size());
        metrics.setTotalProjects(metrics.getInProgressProjects() + completedProjectsCount + cancelledProjectsCount);

        return metrics;
    }

    public List<MeetingCoordinationDTO> getAllMeetings() {
        List<Meeting> meetings = meetingRepository.findAllByOrderByScheduleDateDesc();
        return meetings.stream()
                .map(this::toCoordinationDTO)
                .collect(Collectors.toList());
    }

    private MeetingCoordinationDTO toCoordinationDTO(Meeting meeting) {
        MeetingCoordinationDTO dto = new MeetingCoordinationDTO();
        dto.setId(meeting.getId());
        dto.setProjectTitle(meeting.getProject().getTitle());
        dto.setProfessorName(meeting.getProfessor().getName());
        dto.setScheduleDate(meeting.getScheduleDate());
        dto.setType(meeting.getType());
        dto.setStageGateNumber(meeting.getStageGateNumber());
        dto.setStatus(determineStatus(meeting));
        return dto;
    }

    private MeetingStatusCoordinationEnum determineStatus(Meeting meeting) {
        if (meeting.getStatus() == MeetingStatusEnum.COMPLETED) {
            return MeetingStatusCoordinationEnum.COMPLETED;
        }
        if (meeting.getStatus() == MeetingStatusEnum.CANCELLED) {
            return MeetingStatusCoordinationEnum.CANCELLED;
        }

        LocalDateTime now = LocalDateTime.now();
        if (meeting.getScheduleDate().isAfter(now)) {
            return MeetingStatusCoordinationEnum.PENDING;
        }

        if (meeting.getScheduleDate().isBefore(now) && meeting.getScheduleDate().plusHours(24).isAfter(now)) {
            return MeetingStatusCoordinationEnum.PENDING_FEEDBACK;
        }

        return MeetingStatusCoordinationEnum.LATE_FEEDBACK;
    }
}
