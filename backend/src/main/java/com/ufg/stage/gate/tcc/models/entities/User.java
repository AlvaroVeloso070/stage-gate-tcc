package com.ufg.stage.gate.tcc.models.entities;

import com.ufg.stage.gate.tcc.models.enums.UserType;
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
    @Enumerated(EnumType.STRING)
    private UserType type;
    @ManyToMany
    @JoinTable(
            name = "project_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    private List<Project> projects;
    @OneToMany(mappedBy = "advisor")
    private List<Project> advisorProjects;
}
