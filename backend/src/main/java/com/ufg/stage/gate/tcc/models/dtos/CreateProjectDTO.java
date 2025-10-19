package com.ufg.stage.gate.tcc.models.dtos;

import lombok.Data;

import java.util.List;

@Data
public class CreateProjectDTO {
    private String title;
    private String researchQuestion;
    private List<String> groupMembersIds;
}
