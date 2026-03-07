package com.ufg.stagegate.api.project.domain.model;

import com.ufg.stagegate.api.gate.domain.model.Gate;
import com.ufg.stagegate.api.user.domain.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "TB_PROJECT_GATE", uniqueConstraints = {@UniqueConstraint(columnNames = {"project_id", "gate_id"})})
@Getter
@Setter
public class ProjectGate {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "project_gate_id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gate_id")
    private Gate gate;

    @Column(name = "is_approved")
    private boolean isApproved = false;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "is_close_due_date_reminder_sent")
    private boolean isCloseDueDateReminderSent = false;

    @Column(name = "is_past_due_date_warning_sent")
    private boolean isPastDueDateWarningSent = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approver_professor_id")
    private User approverProfessor;
}
