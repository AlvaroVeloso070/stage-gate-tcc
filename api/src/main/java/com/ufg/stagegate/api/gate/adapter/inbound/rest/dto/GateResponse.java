package com.ufg.stagegate.api.gate.adapter.inbound.rest.dto;

import java.util.UUID;

public record GateResponse(
        UUID id,
        short number,
        String name,
        boolean hasDeliverable
) {
}
