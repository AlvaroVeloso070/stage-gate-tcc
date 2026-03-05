package com.ufg.stagegate.api.user.adapter.outbound.persistence;

import com.ufg.stagegate.api.user.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserJpaRepository extends JpaRepository<User, UUID> {
}
