package com.ufg.stage.gate.tcc.models.dtos;

import com.ufg.stage.gate.tcc.models.entities.MeetingReport;
import com.ufg.stage.gate.tcc.models.enums.GateResultEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeetingReportDTO {

    private UUID id;
    private String feedback;
    private GateResultEnum gateResult;
    private LocalDateTime reportDate;

    public static MeetingReportDTO fromEntity(MeetingReport report) {
        if (report == null) {
            return null;
        }
        return new MeetingReportDTO(
                report.getId(),
                report.getFeedback(),
                report.getGateResult(),
                report.getReportDate()
        );
    }
}
