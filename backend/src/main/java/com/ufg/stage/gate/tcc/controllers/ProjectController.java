package com.ufg.stage.gate.tcc.controllers;

import com.ufg.stage.gate.tcc.models.dtos.CreateMeetingDTO;
import com.ufg.stage.gate.tcc.models.dtos.CreateMeetingReportDTO;
import com.ufg.stage.gate.tcc.models.dtos.CreateProjectDTO;
import com.ufg.stage.gate.tcc.models.dtos.MeetingDTO;
import com.ufg.stage.gate.tcc.models.dtos.ProjectDTO;
import com.ufg.stage.gate.tcc.models.dtos.ProjectListDTO;
import com.ufg.stage.gate.tcc.services.MeetingService;
import com.ufg.stage.gate.tcc.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final MeetingService meetingService;

    public ProjectController(ProjectService projectService, MeetingService meetingService) {
        this.projectService = projectService;
        this.meetingService = meetingService;
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable String projectId) {
        ProjectDTO project = projectService.findProjectById(projectId);
        if (project != null) {
            return ResponseEntity.ok(project);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{projectId}/meetings")
    public ResponseEntity<List<MeetingDTO>> getProjectMeetings(@PathVariable String projectId) {
        List<MeetingDTO> meetings = meetingService.findMeetingsByProjectId(projectId);
        return ResponseEntity.ok(meetings);
    }

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@RequestBody CreateProjectDTO createProjectDTO) {
        ProjectDTO createdProject = projectService.createProject(createProjectDTO);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @PostMapping("/{projectId}/meetings")
    public ResponseEntity<MeetingDTO> createMeeting(@PathVariable String projectId, @RequestBody CreateMeetingDTO createMeetingDTO) {
        MeetingDTO createdMeeting = meetingService.createMeeting(projectId, createMeetingDTO);
        return new ResponseEntity<>(createdMeeting, HttpStatus.CREATED);
    }

    @PostMapping("/meetings/{meetingId}/report")
    public ResponseEntity<MeetingDTO> createMeetingReport(@PathVariable String meetingId, @RequestBody CreateMeetingReportDTO reportDTO) {
        MeetingDTO updatedMeeting = meetingService.createMeetingReport(meetingId, reportDTO);
        return ResponseEntity.ok(updatedMeeting);
    }

    @PatchMapping("/meetings/{meetingId}/cancel")
    public ResponseEntity<MeetingDTO> cancelMeeting(@PathVariable String meetingId) {
        MeetingDTO cancelledMeeting = meetingService.cancelMeeting(meetingId);
        return ResponseEntity.ok(cancelledMeeting);
    }
}
