package com.ufg.stagegate.api.meeting.adapter.outbound.persistence;

import com.ufg.stagegate.api.meeting.domain.port.outbound.MeetingReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MeetingReportRepositoryImpl implements MeetingReportRepository {
    private final MeetingReportJpaRepository jpaRepository;
}
