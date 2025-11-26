package com.ufg.stage.gate.tcc.models.dtos;

import com.ufg.stage.gate.tcc.models.enums.GateResultEnum;
import lombok.Data;

@Data
public class CreateMeetingReportDTO {
    private String feedback;
    private GateResultEnum gateResult;
}
