package com.ufg.stage.gate.tcc.repositories;

import com.ufg.stage.gate.tcc.models.entities.Gate;
import com.ufg.stage.gate.tcc.models.enums.ProjectStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GateRepository extends JpaRepository<Gate, UUID> {

    Optional<Gate> findFirstByProjectIdAndIsApprovedFalseOrderByNumberAsc(UUID projectId);

    Optional<Gate> findByProjectIdAndNumber(UUID projectId, short number);

    List<Gate> findAllByIsApprovedFalseAndProjectStatus(ProjectStatusEnum status);
}
