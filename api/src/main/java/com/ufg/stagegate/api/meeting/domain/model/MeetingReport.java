package com.ufg.stagegate.api.meeting.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "TB_MEETING_REPORTS")
@Getter
@Setter
public class MeetingReport {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "meeting_report_id")
    private UUID id;

    @Column(name = "feedback", length = 2000)
    private String feedback;

    @Enumerated(EnumType.STRING)
    @Column(name = "gate_result")
    private GateResultEnum gateResult;

    @Column(name = "report_date")
    private LocalDateTime reportDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;
}
