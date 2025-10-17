package com.ufg.stage.gate.tcc.models.enums;

import lombok.Getter;

@Getter
public enum GateNameEnum {
    GATE_1("Ideação"),
    GATE_2("Planejamento"),
    GATE_3("Desenvolvimento"),
    GATE_4("Resultados"),
    GATE_5("Redação"),
    GATE_6("Defesa");

    private final String gateName;

    private GateNameEnum(String gateName) {
        this.gateName = gateName;
    }
}
