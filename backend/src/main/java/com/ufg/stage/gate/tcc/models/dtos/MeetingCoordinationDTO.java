package com.ufg.stage.gate.tcc.models.dtos;

import com.ufg.stage.gate.tcc.models.enums.MeetingStatusCoordinationEnum;
import com.ufg.stage.gate.tcc.models.enums.MeetingTypeEnum;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class MeetingCoordinationDTO {
    private UUID id;
    private String projectTitle;
    private String professorName;
    private LocalDateTime scheduleDate;
    private MeetingTypeEnum type;
    private MeetingStatusCoordinationEnum status;
    private int stageGateNumber;
}
