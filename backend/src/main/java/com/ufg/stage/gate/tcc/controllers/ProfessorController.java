package com.ufg.stage.gate.tcc.controllers;

import com.ufg.stage.gate.tcc.models.dtos.CreateRecurrentTimeSlotDTO;
import com.ufg.stage.gate.tcc.models.dtos.MeetingDTO;
import com.ufg.stage.gate.tcc.models.entities.RecurrentTimeSlot;
import com.ufg.stage.gate.tcc.services.ProfessorService;
import com.ufg.stage.gate.tcc.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/professor")
public class ProfessorController {

    private final UserService userService;
    private final ProfessorService professorService;

    public ProfessorController(UserService userService, ProfessorService professorService) {
        this.userService = userService;
        this.professorService = professorService;
    }

    @PostMapping("/timeSlots")
    public ResponseEntity<List<RecurrentTimeSlot>> createRecurrentTimeSlots(@RequestBody CreateRecurrentTimeSlotDTO createRecurrentTimeSlotDTO) {
        var createdTimeSlots = userService.createRecurrentMeetingTimeSlots(createRecurrentTimeSlotDTO);
        return new ResponseEntity<>(createdTimeSlots, HttpStatus.CREATED);
    }

    @GetMapping("/{professorId}/meetings")
    public ResponseEntity<List<MeetingDTO>> findProfessorMeetings(@PathVariable String professorId) {
        System.out.println("=================== " + professorId + " ======================");
        var meetings = professorService.findProfessorMeetings(UUID.fromString(professorId));
        return ResponseEntity.ok(meetings);
    }
}
