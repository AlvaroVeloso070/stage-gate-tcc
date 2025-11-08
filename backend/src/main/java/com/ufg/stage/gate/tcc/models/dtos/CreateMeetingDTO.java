package com.ufg.stage.gate.tcc.models.dtos;

import com.ufg.stage.gate.tcc.models.enums.MeetingTypeEnum;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class CreateMeetingDTO {
    private LocalDate scheduleDate;
    private String timeSlotId;
    private MeetingTypeEnum type;
}
