package com.ufg.stagegate.api.gate.domain.port.outbound;

import com.ufg.stagegate.api.gate.domain.model.Gate;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GateRepository {
    List<Gate> findAll();
    Optional<Gate> findById(UUID id);
    Gate save(Gate gate);
}
