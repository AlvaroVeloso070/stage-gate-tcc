package com.ufg.stagegate.api.project.adapter.outbound.persistence;

import com.ufg.stagegate.api.project.domain.model.ProjectGate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProjectGateJpaRepository extends JpaRepository<ProjectGate, UUID> {
}
