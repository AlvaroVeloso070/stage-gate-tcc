package com.ufg.stage.gate.tcc.models.enums;

import lombok.Getter;

@Getter
public enum StageName {
    STAGE_1("Ideação"),
    STAGE_2("Planejamento"),
    STAGE_3("Desenvolvimento"),
    STAGE_4("Resultados"),
    STAGE_5("Redação"),
    STAGE_6("Defesa");

    private final String stageName;

    private StageName(String stageName) {
        this.stageName = stageName;
    }
}
