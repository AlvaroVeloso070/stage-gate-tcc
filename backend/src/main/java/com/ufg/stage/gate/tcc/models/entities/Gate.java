package com.ufg.stage.gate.tcc.models.entities;

import com.ufg.stage.gate.tcc.models.enums.GateNameEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "gate")
@Getter
@Setter
public class Gate {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private short number;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @Enumerated(EnumType.STRING)
    private GateNameEnum name;

    @Column(name= "is_approved", columnDefinition = "boolean default false")
    private boolean isApproved;

    private LocalDate dueDate;

    @Column(name = "is_close_due_date_reminder_sent", columnDefinition = "boolean default false")
    private boolean isCloseDueDateReminderSent;

    @Column(name = "is_past_due_date_warning_sent", columnDefinition = "boolean default false")
    private boolean isPastDueDateWarningSent;

    @ManyToOne
    @JoinColumn(name = "approver_professor_id")
    private User approverProfessor;
}
