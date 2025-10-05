package com.ufg.stage.gate.tcc.models.entities;

import com.ufg.stage.gate.tcc.models.enums.GateStatus;
import com.ufg.stage.gate.tcc.models.enums.StageName;
import com.ufg.stage.gate.tcc.models.enums.StageStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Stage {

    @Id
    private UUID id;
    @Enumerated(EnumType.STRING)
    private StageName name;
    @Enumerated(EnumType.STRING)
    private StageStatus stageStatus;
    @Enumerated(EnumType.STRING)
    private GateStatus gateStatus;
    @OneToMany(mappedBy = "stage")
    private List<GateFeedback> gateFeedbacks;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDate dueDate;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}
