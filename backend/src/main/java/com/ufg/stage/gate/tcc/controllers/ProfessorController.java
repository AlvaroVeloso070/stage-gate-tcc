package com.ufg.stage.gate.tcc.controllers;

import com.ufg.stage.gate.tcc.models.dtos.CreateRecurrentTimeSlotDTO;
import com.ufg.stage.gate.tcc.models.entities.RecurrentTimeSlot;
import com.ufg.stage.gate.tcc.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/professor")
public class ProfessorController {

    private final UserService userService;

    public ProfessorController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/timeSlots")
    public ResponseEntity<List<RecurrentTimeSlot>> createRecurrentTimeSlots(@RequestBody CreateRecurrentTimeSlotDTO createRecurrentTimeSlotDTO) {
        var createdTimeSlots = userService.createRecurrentMeetingTimeSlots(createRecurrentTimeSlotDTO);
        return new ResponseEntity<>(createdTimeSlots, HttpStatus.CREATED);
    }
}
