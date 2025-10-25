package com.ufg.stage.gate.tcc.models.entities;

import com.ufg.stage.gate.tcc.models.enums.ProjectStatusEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    private Set<User> groupMembers;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    private Set<Meeting> meetings;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    private Set<Gate> gates;

    private String title;

    private String researchQuestion;

    @Enumerated(EnumType.STRING)
    private ProjectStatusEnum status;

    private LocalDate startDate;

    private LocalDate endDate;
}
