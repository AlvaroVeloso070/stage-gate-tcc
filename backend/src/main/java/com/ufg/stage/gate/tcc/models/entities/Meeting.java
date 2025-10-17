package com.ufg.stage.gate.tcc.models.entities;

import com.ufg.stage.gate.tcc.models.enums.MeetingStatusEnum;
import com.ufg.stage.gate.tcc.models.enums.MeetingTypeEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Meeting {

    @Id
    private UUID id;

    @Enumerated(EnumType.STRING)
    private MeetingTypeEnum type;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private User professor;

    private short stageGateNumber;

    @ManyToMany
    @JoinTable(
            name = "meeting_participant",
            joinColumns = @JoinColumn(name = "meeting_id"),
            inverseJoinColumns = @JoinColumn(name = "participant_user_id")
    )
    private List<User> participants;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    private LocalDateTime scheduleDate;

    @Enumerated(EnumType.STRING)
    private MeetingStatusEnum status;

    @OneToOne(mappedBy = "meeting")
    private MeetingReport report;
}
