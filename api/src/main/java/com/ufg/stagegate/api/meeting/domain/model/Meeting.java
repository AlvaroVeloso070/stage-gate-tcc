package com.ufg.stagegate.api.meeting.domain.model;

import com.ufg.stagegate.api.project.domain.model.Project;
import com.ufg.stagegate.api.user.domain.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "TB_MEETINGS")
@Getter
@Setter
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "meeting_id")
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private MeetingTypeEnum type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professor_id")
    private User professor;

    @Column(name = "stage_gate_number")
    private short stageGateNumber;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "TB_MEETING_PARTICIPANTS", joinColumns = @JoinColumn(name = "meeting_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> participants;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(name = "schedule_date")
    private LocalDate scheduleDate;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private MeetingStatusEnum status;

    @OneToOne(mappedBy = "meeting", fetch = FetchType.LAZY)
    private MeetingReport report;

    @Column(name = "is_report_reminder_sent")
    private boolean isReportReminderSent = false;
}
