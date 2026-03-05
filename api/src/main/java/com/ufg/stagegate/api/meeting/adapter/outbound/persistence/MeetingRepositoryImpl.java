package com.ufg.stagegate.api.meeting.adapter.outbound.persistence;

import com.ufg.stagegate.api.meeting.domain.port.outbound.MeetingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MeetingRepositoryImpl implements MeetingRepository {
    private final MeetingJpaRepository jpaRepository;
}
