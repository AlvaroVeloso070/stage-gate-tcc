package com.ufg.stage.gate.tcc.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Project {

    @Id
    private UUID id;
    private String title;
    private String format;
    @ManyToOne
    @JoinColumn(name = "advisor_user_id")
    private User advisor;
    @ManyToMany(mappedBy = "projects")
    private List<User> groupMembers;
    private String researchQuestion;
    @OneToMany(mappedBy = "project")
    private List<ProjectFeedback> projectFeedbacks;
    @OneToMany(mappedBy = "project")
    private List<Stage> stages;
}
