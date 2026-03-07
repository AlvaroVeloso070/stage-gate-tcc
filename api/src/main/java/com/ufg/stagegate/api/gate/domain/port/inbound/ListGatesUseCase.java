package com.ufg.stagegate.api.gate.domain.port.inbound;

import com.ufg.stagegate.api.gate.adapter.inbound.rest.dto.GateResponse;

import java.util.List;

public interface ListGatesUseCase {
    List<GateResponse> execute();
}
