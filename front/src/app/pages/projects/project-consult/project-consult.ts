import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Project, ProjectStatus, UserTypeEnum } from '@/pages/projects/entities/project';
import { GatesProgressStepper } from '@/pages/projects/components/gates-progress-stepper/gates-progress-stepper';
import { TagProjectStatus } from '@/pages/projects/components/tag-project-status/tag-project-status';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { ProjectProgress } from '@/pages/projects/components/project-progress/project-progress';
import { ProjectMeetings } from '@/pages/projects/components/project-meetings/project-meetings';
import {DatePipe} from "@angular/common";
import { ProjectService } from '@/services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-project-consult',
    imports: [TableModule, GatesProgressStepper, TagProjectStatus, Tabs, TabList, Tab, TabPanels, TabPanel, ProjectProgress, ProjectMeetings, DatePipe],
    templateUrl: './project-consult.html',
    standalone: true,
    styleUrl: './project-consult.scss'
})
export class ProjectConsult implements OnInit {

    private projectService : ProjectService = inject(ProjectService);
    private activatedRoute : ActivatedRoute = inject(ActivatedRoute);

    protected activeGate: WritableSignal<number> = signal(1);
    protected isAllGatesCompleted: WritableSignal<boolean> = signal(false);
    protected readonly TABS = {
        PROGRESS: 0,
        MEETINGS: 1
    };

    protected project !: Project;

    ngOnInit(): void {
        let id : string = this.activatedRoute.snapshot.params["id"];
        this.projectService.getProjectById(id).subscribe(project => {
            this.project = project;
            this.handleGates();
        })
    }

    private handleGates() {
        const gates = this.project.gates ?? [];

        const approvedGates = gates.filter((g) => g.approved);
        const highestApproved = approvedGates.length ? Math.max(...approvedGates.map((g) => g.number)) : 0;

        const nextGate = highestApproved + 1;
        const lastGateNumber = 6;

        this.activeGate.set(Math.min(nextGate, lastGateNumber));

        const allCompleted = gates.some((g) => g.number === lastGateNumber && g.approved);
        this.isAllGatesCompleted.set(allCompleted);
    }

    protected getGroupMembers(project: Project) {
        return project.groupMembers.map((member) => member.name).join(', ');
    }
}
