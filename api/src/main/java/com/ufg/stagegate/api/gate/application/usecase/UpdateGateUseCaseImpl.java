package com.ufg.stagegate.api.gate.application.usecase;

import com.ufg.stagegate.api.core.exception.ResourceNotFoundException;
import com.ufg.stagegate.api.gate.adapter.inbound.rest.dto.GateResponse;
import com.ufg.stagegate.api.gate.adapter.inbound.rest.dto.UpdateGateRequest;
import com.ufg.stagegate.api.gate.application.mapper.GateMapper;
import com.ufg.stagegate.api.gate.domain.model.Gate;
import com.ufg.stagegate.api.gate.domain.port.inbound.UpdateGateUseCase;
import com.ufg.stagegate.api.gate.domain.port.outbound.GateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UpdateGateUseCaseImpl implements UpdateGateUseCase {

    private final GateRepository gateRepository;
    private final GateMapper gateMapper;

    @Transactional
    @Override
    public GateResponse execute(UUID id, UpdateGateRequest request) {
        Gate gate = gateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gate with ID " + id + " not found"));

        gate.setName(request.name());
        gate.setHasDeliverable(request.hasDeliverable());

        Gate updated = gateRepository.save(gate);

        return gateMapper.toResponse(updated);
    }
}
