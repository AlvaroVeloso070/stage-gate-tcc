package com.ufg.stage.gate.tcc.services;

import com.ufg.stage.gate.tcc.models.entities.User;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.Map;

@Service
public class ReminderService {

    private final ProjectService projectService;
    private final EmailService emailService;
    private final MeetingService meetingService;


    public ReminderService(ProjectService projectService, EmailService emailService, MeetingService meetingService) {
        this.projectService = projectService;
        this.emailService = emailService;
        this.meetingService = meetingService;
    }

    @Scheduled(cron = "0 0 9 * * *") // Every day at 9 AM
    public void sendDueDateReminders() {
        System.out.println("Sending due date reminders...");
        var projects = projectService.findProjectsWithUpcomingUnapprovedGates();
        for (var project : projects) {
            System.out.println("REMINDER FOR Project: " + project.getTitle());
            var gate = project.getGates().stream().filter(g -> !g.isApproved()).findFirst().orElse(null);
            if (gate == null) {
                System.out.println("No not approved gate found for project");
                continue;
            }
            var dueDate = gate.getDueDate();
            var users = project.getGroupMembers();
            for (var user : users) {
                System.out.println("Sending reminder to user: " + user.getName());
                emailService.sendEmail(
                        user.getEmail(),
                        "Lembrete prazo final Gate TCC",
                        "lembrete-prazo-final",
                        Map.of(
                                "userName", user.getName(),
                                "projectName", project.getTitle(),
                                "dueDate", dueDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
                        )
                );
            }
        }
    }

    @Scheduled(cron = "0 0 9 * * *") // Every day at 9 AM
    public void sendPastDueDateWarnings() {
        System.out.println("Sending past due date warnings...");
        var projects = projectService.findProjectsNotApprovedPastDueDate();
        for (var project : projects) {
            System.out.println("Past due date warning for Project: " + project.getTitle());
            var gate = project.getGates().stream().filter(g -> !g.isApproved()).findFirst().orElse(null);
            if (gate == null) {
                System.out.println("No not approved gate found for project");
                continue;
            }
            var dueDate = gate.getDueDate();
            var users = project.getGroupMembers();
            for (var user : users) {
                System.out.println("Sending past due date warning for user: " + user.getName());
                emailService.sendEmail(
                        user.getEmail(),
                        "Projeto com atraso no prazo de entrega",
                        "atraso-na-entrega",
                        Map.of(
                                "userName", user.getName(),
                                "projectName", project.getTitle(),
                                "dueDate", dueDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
                        )
                );
            }
        }
    }

    @Scheduled(cron = "0 0 */1 * * *") // Every Hour
    public void sendMeetingReportCreationReminder() {
        System.out.println("Sending meeting report creation reminder...");
        var meetings = meetingService.findOverdueMeetingsWithoutReport();
        for (var meeting : meetings) {
            var professor = meeting.getProfessor();
            System.out.println("Sending meeting report reminder to professor: " + professor.getName());
            emailService.sendEmail(
                    professor.getEmail(),
                    "Lembrete de preenchimento de ata da reunião stage gate",
                    "meeting-report-creation-reminder",
                    Map.of(
                            "userName", professor.getName(),
                            "projectName", meeting.getProject().getTitle(),
                            "scheduleDate", meeting.getScheduleDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"))
                    )
            );
        }
    }
}
