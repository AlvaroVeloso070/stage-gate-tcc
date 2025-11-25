package com.ufg.stage.gate.tcc.repositories;

import com.ufg.stage.gate.tcc.models.entities.User;
import com.ufg.stage.gate.tcc.models.enums.UserTypeEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    List<User> findByType(UserTypeEnum type);
}
