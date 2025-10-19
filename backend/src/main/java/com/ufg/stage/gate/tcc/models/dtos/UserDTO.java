package com.ufg.stage.gate.tcc.models.dtos;

import com.ufg.stage.gate.tcc.models.entities.User;
import com.ufg.stage.gate.tcc.models.enums.UserTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private UUID id;
    private String name;
    private String email;
    private UserTypeEnum type;

    public static UserDTO fromEntity(User user) {
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getType()
        );
    }
}
