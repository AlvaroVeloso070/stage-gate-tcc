package com.ufg.stage.gate.tcc.services;

import com.ufg.stage.gate.tcc.models.dtos.CreateProjectDTO;
import com.ufg.stage.gate.tcc.models.dtos.ProjectDTO;
import com.ufg.stage.gate.tcc.models.dtos.ProjectListDTO;
import com.ufg.stage.gate.tcc.models.entities.Gate;
import com.ufg.stage.gate.tcc.models.entities.Project;
import com.ufg.stage.gate.tcc.models.entities.User;
import com.ufg.stage.gate.tcc.models.enums.DueDateStatus;
import com.ufg.stage.gate.tcc.models.enums.GateNameEnum;
import com.ufg.stage.gate.tcc.models.enums.ProjectStatusEnum;
import com.ufg.stage.gate.tcc.repositories.GateRepository;
import com.ufg.stage.gate.tcc.repositories.ProjectRepository;
import com.ufg.stage.gate.tcc.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final GateRepository gateRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository, GateRepository gateRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.gateRepository = gateRepository;
    }

    public List<ProjectListDTO> listAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return projects.stream().map(this::mapToProjectListDTO).collect(Collectors.toList());
    }

    private ProjectListDTO mapToProjectListDTO(Project project) {
        Optional<Gate> currentGateOpt = gateRepository.findFirstByProjectIdAndIsApprovedFalseOrderByNumberAsc(project.getId());
        int currentGateNumber = currentGateOpt.map(Gate::getNumber).orElse((short)0);
        LocalDate dueDate = currentGateOpt.map(Gate::getDueDate).orElse(null);
        DueDateStatus dueDateStatus = calculateDueDateStatus(dueDate);

        List<String> groupMemberNames = project.getGroupMembers().stream()
                .map(User::getName)
                .collect(Collectors.toList());

        return new ProjectListDTO(
                project.getId(),
                project.getTitle(),
                groupMemberNames,
                currentGateNumber,
                dueDate,
                dueDateStatus
        );
    }

    private DueDateStatus calculateDueDateStatus(LocalDate dueDate) {
        if (dueDate == null) {
            return null;
        }
        long daysUntilDue = ChronoUnit.DAYS.between(LocalDate.now(), dueDate);
        if (daysUntilDue < 0) {
            return DueDateStatus.OVERDUE;
        }
        if (daysUntilDue <= 7) {
            return DueDateStatus.WARNING;
        }
        return DueDateStatus.ON_TIME;
    }

    public ProjectDTO findProjectById(String projectId) {
        return projectRepository.findById(UUID.fromString(projectId))
                .map(ProjectDTO::fromEntity)
                .orElse(null);
    }

    @Transactional
    public ProjectDTO createProject(CreateProjectDTO createProjectDTO) {
        Project project = new Project();
        project.setTitle(createProjectDTO.getTitle());
        project.setResearchQuestion(createProjectDTO.getResearchQuestion());
        project.setStatus(ProjectStatusEnum.IN_PROGRESS);
        project.setStartDate(LocalDate.now());

        Project savedProject = projectRepository.save(project);

        List<UUID> userUuids = createProjectDTO.getGroupMembersIds().stream().map(UUID::fromString).collect(Collectors.toList());
        List<User> groupMembers = userRepository.findAllById(userUuids);

        for (User member : groupMembers) {
            member.setProject(savedProject);
        }
        userRepository.saveAll(groupMembers);

        Gate gate = new Gate();
        gate.setNumber((short) 1);
        gate.setName(GateNameEnum.GATE_1);
        gate.setProject(savedProject);

        gateRepository.save(gate);

        savedProject.setGroupMembers(new HashSet<>(groupMembers));

        return ProjectDTO.fromEntity(savedProject);
    }

    public List<Project> findProjectsWithUpcomingUnapprovedGates() {
        LocalDate sevenDaysFromNow = LocalDate.now().plusDays(7);
        return projectRepository.findProjectsWithUnapprovedGatesDueWithin(sevenDaysFromNow, LocalDate.now());
    }

    public List<Project> findProjectsNotApprovedPastDueDate() {
        return projectRepository.findProjectsWithUnapprovedGatesPastDueDate(LocalDate.now());
    }
}
