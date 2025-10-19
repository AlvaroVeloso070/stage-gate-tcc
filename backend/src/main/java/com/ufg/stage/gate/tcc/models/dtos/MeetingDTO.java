package com.ufg.stage.gate.tcc.models.dtos;

import com.ufg.stage.gate.tcc.models.entities.Meeting;
import com.ufg.stage.gate.tcc.models.enums.MeetingStatusEnum;
import com.ufg.stage.gate.tcc.models.enums.MeetingTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeetingDTO {

    private UUID id;
    private MeetingTypeEnum type;
    private UserDTO professor;
    private short stageGateNumber;
    private List<UserDTO> participants;
    private LocalDateTime scheduleDate;
    private MeetingStatusEnum status;
    private MeetingReportDTO report;

    public static MeetingDTO fromEntity(Meeting meeting) {
        List<UserDTO> participantDTOs = Optional.ofNullable(meeting.getParticipants()).orElse(Collections.emptyList()).stream()
                .map(UserDTO::fromEntity)
                .collect(Collectors.toList());

        UserDTO professorDto = Optional.ofNullable(meeting.getProfessor())
                .map(UserDTO::fromEntity)
                .orElse(null);

        return new MeetingDTO(
                meeting.getId(),
                meeting.getType(),
                professorDto,
                meeting.getStageGateNumber(),
                participantDTOs,
                meeting.getScheduleDate(),
                meeting.getStatus(),
                MeetingReportDTO.fromEntity(meeting.getReport())
        );
    }
}
