package com.ufg.stage.gate.tcc.repositories;

import com.ufg.stage.gate.tcc.models.entities.RecurrentTimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RecurrentTimeSlotRepository extends JpaRepository<RecurrentTimeSlot, UUID> {

}
