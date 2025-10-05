package com.ufg.stage.gate.tcc.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
public class ProjectFeedback {

    @Id
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "reviewer_user_id")
    private User reviewer;
    private String reviewText;
    private String createdAt;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}
