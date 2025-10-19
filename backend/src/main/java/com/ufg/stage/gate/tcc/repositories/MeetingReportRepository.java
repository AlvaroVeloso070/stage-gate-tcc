package com.ufg.stage.gate.tcc.repositories;

import com.ufg.stage.gate.tcc.models.entities.MeetingReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MeetingReportRepository extends JpaRepository<MeetingReport, UUID> {
}
