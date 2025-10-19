package com.ufg.stage.gate.tcc.models.dtos;

import com.ufg.stage.gate.tcc.models.entities.Gate;
import com.ufg.stage.gate.tcc.models.enums.GateNameEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GateDTO {

    private UUID id;
    private short number;
    private GateNameEnum name;
    private boolean isApproved;
    private LocalDate dueDate;

    public static GateDTO fromEntity(Gate gate) {
        return new GateDTO(
                gate.getId(),
                gate.getNumber(),
                gate.getName(),
                gate.isApproved(),
                gate.getDueDate()
        );
    }
}
