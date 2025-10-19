package com.ufg.stage.gate.tcc.models.dtos;

import com.ufg.stage.gate.tcc.models.enums.DueDateStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectListDTO {
    private String title;
    private List<String> groupMembers;
    private int currentGateNumber;
    private LocalDate dueDate;
    private DueDateStatus dueDateStatus;
}
