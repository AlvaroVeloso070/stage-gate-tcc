package com.ufg.stagegate.api.gate.adapter.outbound.persistence;

import com.ufg.stagegate.api.gate.domain.model.Gate;
import com.ufg.stagegate.api.gate.domain.port.outbound.GateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class GateRepositoryImpl implements GateRepository {
    private final GateJpaRepository jpaRepository;

    @Override
    public List<Gate> findAll() {
        return jpaRepository.findAllByOrderByNumberAsc();
    }

    @Override
    public Optional<Gate> findById(UUID id) {
        return jpaRepository.findById(id);
    }

    @Override
    public Gate save(Gate gate) {
        return jpaRepository.save(gate);
    }
}
