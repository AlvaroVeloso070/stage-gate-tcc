package com.ufg.stagegate.api.project.adapter.outbound.persistence;

import com.ufg.stagegate.api.project.domain.port.outbound.ProjectGateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProjectGateRepositoryImpl implements ProjectGateRepository {
    private final ProjectGateJpaRepository jpaRepository;
}
