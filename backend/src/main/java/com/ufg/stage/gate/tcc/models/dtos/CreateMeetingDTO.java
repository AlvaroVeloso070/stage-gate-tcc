package com.ufg.stage.gate.tcc.models.dtos;

import com.ufg.stage.gate.tcc.models.enums.MeetingTypeEnum;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateMeetingDTO {
    private String professorId;
    private LocalDateTime scheduleDate;
    private MeetingTypeEnum type;
}
