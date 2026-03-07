package com.ufg.stagegate.api.project.domain.model;

import com.ufg.stagegate.api.meeting.domain.model.Meeting;
import com.ufg.stagegate.api.user.domain.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "TB_PROJECTS")
@Getter
@Setter
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "project_id")
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "research_question")
    private String researchQuestion;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ProjectStatusEnum status;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    private Set<User> groupMembers;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    private Set<Meeting> meetings;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    private Set<ProjectGate> projectGates;
}
