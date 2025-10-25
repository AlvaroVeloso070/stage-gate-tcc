package com.ufg.stage.gate.tcc.repositories;

import com.ufg.stage.gate.tcc.models.entities.Meeting;
import com.ufg.stage.gate.tcc.models.enums.MeetingStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, UUID> {

    public List<Meeting> findByProjectId(UUID projectId);
    public List<Meeting> findAllByOrderByScheduleDateDesc();

    @Query("SELECT m FROM Meeting m JOIN FETCH m.professor JOIN FETCH m.project WHERE m.status = :status AND m.scheduleDate <= :scheduleDate AND m.report IS NULL")
    List<Meeting> findMeetingsWithProfessorByStatusAndScheduleDateBeforeAndReportIsNull(@Param("status") MeetingStatusEnum status, @Param("scheduleDate") LocalDateTime scheduleDate);
}
