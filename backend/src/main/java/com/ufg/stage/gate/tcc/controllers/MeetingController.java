package com.ufg.stage.gate.tcc.controllers;

import com.ufg.stage.gate.tcc.models.dtos.MeetingDTO;
import com.ufg.stage.gate.tcc.models.dtos.TimeSlotDTO;
import com.ufg.stage.gate.tcc.models.entities.Meeting;
import com.ufg.stage.gate.tcc.services.MeetingService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/meetings")
public class MeetingController {

    private final MeetingService meetingService;

    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @GetMapping("/timeSlots")
    public ResponseEntity<List<TimeSlotDTO>> getTimeSlots(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                          @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<TimeSlotDTO> timeSlots = meetingService.findTimeSlotsForDate(startDate, endDate);
        return ResponseEntity.ok(timeSlots);
    }

    @GetMapping("/professor/{id}")
    public ResponseEntity<List<MeetingDTO>> getMeetingsByProfessor(@PathVariable String id) {
        List<MeetingDTO> meetings = meetingService.findMeetingsByProfessorId(id);
        return ResponseEntity.ok(meetings);
    }
}
