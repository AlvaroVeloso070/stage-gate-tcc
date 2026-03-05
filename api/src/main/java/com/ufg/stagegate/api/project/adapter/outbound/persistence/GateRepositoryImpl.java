package com.ufg.stagegate.api.project.adapter.outbound.persistence;

import com.ufg.stagegate.api.project.domain.port.outbound.GateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GateRepositoryImpl implements GateRepository {
    private final GateJpaRepository jpaRepository;
}
