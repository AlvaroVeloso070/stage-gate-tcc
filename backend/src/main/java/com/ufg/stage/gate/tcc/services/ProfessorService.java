package com.ufg.stage.gate.tcc.services;

import com.ufg.stage.gate.tcc.models.dtos.MeetingDTO;
import com.ufg.stage.gate.tcc.repositories.MeetingRepository;
import com.ufg.stage.gate.tcc.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProfessorService {

    private final MeetingRepository meetingRepository;

    public ProfessorService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    public List<MeetingDTO> findProfessorMeetings(UUID professorId) {
        var meetings = this.meetingRepository.findAllByProfessorIdOrderByScheduleDateDesc(professorId);
        return meetings.stream().map(MeetingDTO::fromEntity).toList();
    }
}
