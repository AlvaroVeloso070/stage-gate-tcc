package com.ufg.stagegate.api.gate.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "TB_GATES", uniqueConstraints = {@UniqueConstraint(columnNames = {"number"})})
@Getter
@Setter
public class Gate {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "gate_id")
    private UUID id;

    @Column(name = "number", unique = true, nullable = false)
    private short number;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "has_deliverable", nullable = false)
    private boolean hasDeliverable;
}
