package com.ufg.stage.gate.tcc.services;

import com.ufg.stage.gate.tcc.models.dtos.UserDTO;
import com.ufg.stage.gate.tcc.models.entities.User;
import com.ufg.stage.gate.tcc.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService (UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO findUserById(String userId) {
        return this.userRepository.findById(UUID.fromString(userId))
                .map(UserDTO::fromEntity)
                .orElse(null);
    }

    public User createUser(User user) {
        return this.userRepository.save(user);
    }
}
