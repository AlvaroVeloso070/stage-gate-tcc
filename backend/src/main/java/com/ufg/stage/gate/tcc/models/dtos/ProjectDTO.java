package com.ufg.stage.gate.tcc.models.dtos;

import com.ufg.stage.gate.tcc.models.entities.Project;
import com.ufg.stage.gate.tcc.models.enums.ProjectStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {

    private UUID id;
    private String title;
    private String researchQuestion;
    private ProjectStatusEnum status;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<UserDTO> groupMembers;
    private List<GateDTO> gates;

    public static ProjectDTO fromEntity(Project project) {
        List<UserDTO> memberDTOs = Optional.ofNullable(project.getGroupMembers()).orElse(Collections.emptyList()).stream()
                .map(UserDTO::fromEntity)
                .collect(Collectors.toList());

        List<GateDTO> gateDTOs = Optional.ofNullable(project.getGates()).orElse(Collections.emptyList()).stream()
                .map(GateDTO::fromEntity)
                .collect(Collectors.toList());

        return new ProjectDTO(
                project.getId(),
                project.getTitle(),
                project.getResearchQuestion(),
                project.getStatus(),
                project.getStartDate(),
                project.getEndDate(),
                memberDTOs,
                gateDTOs
        );
    }
}
