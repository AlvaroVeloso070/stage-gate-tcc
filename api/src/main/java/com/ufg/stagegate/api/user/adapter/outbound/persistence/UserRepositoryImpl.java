package com.ufg.stagegate.api.user.adapter.outbound.persistence;

import com.ufg.stagegate.api.user.domain.port.outbound.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {
    private final UserJpaRepository jpaRepository;
}
