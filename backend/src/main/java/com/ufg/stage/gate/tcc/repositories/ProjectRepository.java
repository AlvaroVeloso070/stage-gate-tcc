package com.ufg.stage.gate.tcc.repositories;

import com.ufg.stage.gate.tcc.models.entities.Project;
import com.ufg.stage.gate.tcc.models.enums.ProjectStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {
    long countByStatus(ProjectStatusEnum status);

    @Query("SELECT p FROM Project p JOIN FETCH p.gates g JOIN FETCH p.groupMembers WHERE g.isApproved = false AND g.isCloseDueDateReminderSent = false AND g.dueDate <= :dueDate AND g.dueDate >= :currentDate")
    List<Project> findProjectsWithUnapprovedGatesDueWithin(@Param("dueDate") LocalDate dueDate, @Param("currentDate") LocalDate currentDate);

    @Query("SELECT p FROM Project p JOIN FETCH p.gates g JOIN FETCH p.groupMembers WHERE g.isApproved = false AND g.isPastDueDateWarningSent = false AND g.dueDate < :currentDate")
    List<Project> findProjectsWithUnapprovedGatesPastDueDate(@Param("currentDate") LocalDate currentDate);
}
