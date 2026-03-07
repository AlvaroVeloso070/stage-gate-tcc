package com.ufg.stagegate.api.gate.application.usecase;

import com.ufg.stagegate.api.gate.adapter.inbound.rest.dto.GateResponse;
import com.ufg.stagegate.api.gate.application.mapper.GateMapper;
import com.ufg.stagegate.api.gate.domain.port.inbound.ListGatesUseCase;
import com.ufg.stagegate.api.gate.domain.port.outbound.GateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ListGatesUseCaseImpl implements ListGatesUseCase {

    private final GateRepository gateRepository;
    private final GateMapper gateMapper;

    @Transactional(readOnly = true)
    @Override
    public List<GateResponse> execute() {
        return gateMapper.toResponseList(gateRepository.findAll());
    }
}
