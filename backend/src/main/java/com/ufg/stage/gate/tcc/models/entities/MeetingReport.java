package com.ufg.stage.gate.tcc.models.entities;

import com.ufg.stage.gate.tcc.models.enums.GateResultEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
public class MeetingReport {

    @Id
    private UUID id;

    private String feedback;

    @Enumerated(EnumType.STRING)
    private GateResultEnum gateResult;

    private LocalDateTime reportDate;

    @OneToOne
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;
}
