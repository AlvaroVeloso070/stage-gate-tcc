package com.ufg.stagegate.api.project.adapter.outbound.persistence;

import com.ufg.stagegate.api.project.domain.port.outbound.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProjectRepositoryImpl implements ProjectRepository {
    private final ProjectJpaRepository jpaRepository;
}
