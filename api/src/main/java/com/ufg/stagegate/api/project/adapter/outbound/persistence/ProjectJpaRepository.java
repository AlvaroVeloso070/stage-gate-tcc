package com.ufg.stagegate.api.project.adapter.outbound.persistence;

import com.ufg.stagegate.api.project.domain.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProjectJpaRepository extends JpaRepository<Project, UUID> {
}
