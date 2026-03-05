package com.ufg.stagegate.api.project.domain.model;

import com.ufg.stagegate.api.user.domain.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "TB_GATES")
@Getter
@Setter
public class Gate {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "gate_id")
    private UUID id;

    @Column(name = "number")
    private short number;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private GateNameEnum name;

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
