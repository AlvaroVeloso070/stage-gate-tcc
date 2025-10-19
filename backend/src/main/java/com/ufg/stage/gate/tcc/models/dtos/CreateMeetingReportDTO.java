package com.ufg.stage.gate.tcc.models.dtos;

import com.ufg.stage.gate.tcc.models.enums.GateResultEnum;
import lombok.Data;

import java.util.List;

@Data
public class CreateMeetingReportDTO {
    private List<String> participantIds;
    private String feedback;
    private GateResultEnum gateResult;
}
