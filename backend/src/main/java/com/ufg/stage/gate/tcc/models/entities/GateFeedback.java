package com.ufg.stage.gate.tcc.models.entities;

import com.ufg.stage.gate.tcc.models.enums.GateStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
public class GateFeedback {

    @Id
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "reviewer_user_id")
    private User reviewer;
    private Integer methodGrade;
    private Integer executionPossibilityGrade;
    private Integer ethicsGrade;
    private String reviewText;
    @Enumerated(EnumType.STRING)
    private GateStatus gateStatus;
    @ManyToOne
    @JoinColumn(name = "stage_id")
    private Stage stage;
}
