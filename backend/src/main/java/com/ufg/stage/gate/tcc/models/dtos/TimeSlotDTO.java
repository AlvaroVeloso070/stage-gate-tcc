package com.ufg.stage.gate.tcc.models.dtos;

import com.ufg.stage.gate.tcc.models.entities.RecurrentTimeSlot;
import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class TimeSlotDTO {
    private String id;
    private LocalDate scheduleDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private DayOfWeek dayOfWeek;
    private UserDTO professor;
    private boolean isAvailable;

    public TimeSlotDTO (RecurrentTimeSlot timeSlot, LocalDate scheduleDate) {
        this.id = timeSlot.getId().toString();
        this.scheduleDate = scheduleDate;
        this.startTime = timeSlot.getStartTime();
        this.endTime = timeSlot.getEndTime();
        this.dayOfWeek = timeSlot.getDayOfWeek();
        this.professor = UserDTO.fromEntity(timeSlot.getProfessor());
        this.isAvailable = true;
    }
}
