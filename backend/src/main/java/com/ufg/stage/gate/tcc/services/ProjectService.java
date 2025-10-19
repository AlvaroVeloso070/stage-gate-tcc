package com.ufg.stage.gate.tcc.services;

import com.ufg.stage.gate.tcc.models.dtos.CreateProjectDTO;
import com.ufg.stage.gate.tcc.models.dtos.ProjectDTO;
import com.ufg.stage.gate.tcc.models.entities.Gate;
import com.ufg.stage.gate.tcc.models.entities.Project;
import com.ufg.stage.gate.tcc.models.entities.User;
import com.ufg.stage.gate.tcc.models.enums.GateNameEnum;
import com.ufg.stage.gate.tcc.models.enums.ProjectStatusEnum;
import com.ufg.stage.gate.tcc.repositories.GateRepository;
import com.ufg.stage.gate.tcc.repositories.ProjectRepository;
import com.ufg.stage.gate.tcc.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
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

        savedProject.setGroupMembers(groupMembers);

        return ProjectDTO.fromEntity(savedProject);
    }
}
