package com.ufg.stage.gate.tcc.models.entities;

import com.ufg.stage.gate.tcc.models.enums.UserTypeEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "app_user")
@Getter
@Setter
public class User {

    @Id
    private UUID id;

    private String name;

    private String email;

    @Enumerated(EnumType.STRING)
    private UserTypeEnum type;

    @ManyToMany(mappedBy = "participants")
    private List<Meeting> meetings;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}
