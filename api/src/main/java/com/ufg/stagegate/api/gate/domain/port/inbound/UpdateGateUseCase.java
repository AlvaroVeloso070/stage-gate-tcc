package com.ufg.stagegate.api.gate.domain.port.inbound;

import com.ufg.stagegate.api.gate.adapter.inbound.rest.dto.GateResponse;
import com.ufg.stagegate.api.gate.adapter.inbound.rest.dto.UpdateGateRequest;

import java.util.UUID;

public interface UpdateGateUseCase {
    GateResponse execute(UUID id, UpdateGateRequest request);
}
