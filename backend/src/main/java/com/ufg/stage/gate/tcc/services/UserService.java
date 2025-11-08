package com.ufg.stage.gate.tcc.services;

import com.ufg.stage.gate.tcc.models.dtos.CreateRecurrentTimeSlotDTO;
import com.ufg.stage.gate.tcc.models.dtos.UserDTO;
import com.ufg.stage.gate.tcc.models.entities.RecurrentTimeSlot;
import com.ufg.stage.gate.tcc.models.entities.User;
import com.ufg.stage.gate.tcc.repositories.RecurrentTimeSlotRepository;
import com.ufg.stage.gate.tcc.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RecurrentTimeSlotRepository timeSlotRepository;

    public UserService (UserRepository userRepository, RecurrentTimeSlotRepository timeSlotRepository) {
        this.userRepository = userRepository;
        this.timeSlotRepository = timeSlotRepository;
    }

    public UserDTO findUserById(String userId) {
        return this.userRepository.findById(UUID.fromString(userId))
                .map(UserDTO::fromEntity)
                .orElse(null);
    }

    public User createUser(User user) {
        return this.userRepository.save(user);
    }

    public List<RecurrentTimeSlot> createRecurrentMeetingTimeSlots(CreateRecurrentTimeSlotDTO dto) {
        var timeslots = dto.toRecurrentTimeSlotEntity();
        return this.timeSlotRepository.saveAll(timeslots);
    }
}
