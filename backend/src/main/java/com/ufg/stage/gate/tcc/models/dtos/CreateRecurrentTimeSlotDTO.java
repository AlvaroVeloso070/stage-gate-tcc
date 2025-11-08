package com.ufg.stage.gate.tcc.models.dtos;

import com.ufg.stage.gate.tcc.models.entities.RecurrentTimeSlot;
import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class CreateRecurrentTimeSlotDTO {

    private LocalTime startTime;
    private LocalTime endTime;
    private List<DayOfWeek> daysOfWeek;
    private String professorId;

    public List<RecurrentTimeSlot> toRecurrentTimeSlotEntity() {
        List<RecurrentTimeSlot> timeSlots = new ArrayList<>();
        for (DayOfWeek dayOfWeek : daysOfWeek) {
            timeSlots.add(new RecurrentTimeSlot(startTime, endTime, dayOfWeek, professorId));
        }

        return timeSlots;
    }
}
