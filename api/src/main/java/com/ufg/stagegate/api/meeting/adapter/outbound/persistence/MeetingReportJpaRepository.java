package com.ufg.stagegate.api.meeting.adapter.outbound.persistence;

import com.ufg.stagegate.api.meeting.domain.model.MeetingReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MeetingReportJpaRepository extends JpaRepository<MeetingReport, UUID> {
}
