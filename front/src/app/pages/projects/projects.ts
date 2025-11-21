import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DueDateStatus, ProjectListing } from '@/pages/projects/entities/projectListing';
import { Button } from 'primeng/button';
import { TagProjectDueStatus } from '@/pages/projects/components/tag-project-due-status/tag-project-due-status';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CoordinationService } from '@/services/coordination.service';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import {Select} from "primeng/select";
import {FilterOption} from "@/shared/dtos/FilterOption";
import {TagMeetingStatus} from "@/pages/meetings/components/tag-meeting-status/tag-meeting-status";

@Component({
    selector: 'app-projects',
    imports: [TableModule, Button, TagProjectDueStatus, DatePipe, InputTextModule, MultiSelectModule, FormsModule, SelectButtonModule, Select, TagMeetingStatus],
    templateUrl: './projects.html',
    styleUrl: './projects.scss'
})
export class Projects implements OnInit {
    private coordinationService: CoordinationService = inject(CoordinationService);
    private readonly router: Router = inject(Router);

    protected projects!: ProjectListing[];

    protected dueStatusOptions: FilterOption[] = [
        { label: 'No Prazo', value: DueDateStatus.ON_TIME },
        { label: 'Alerta', value: DueDateStatus.WARNING },
        { label: 'Atrasado', value: DueDateStatus.OVERDUE }
    ];

    protected gateOptions: FilterOption[] = [
        { label: 'Gate 1', value: 1 },
        { label: 'Gate 2', value: 2 },
        { label: 'Gate 3', value: 3 },
        { label: 'Gate 4', value: 4 },
        { label: 'Gate 5', value: 5 }
    ];

    ngOnInit(): void {
        this.coordinationService.getAllProjects().subscribe((projects) => {
            this.projects = projects
                // TODO - Remover este filter futuramente quando for para produção
                .filter(item => item.currentGateNumber && item.dueDate && item.dueDateStatus && item.groupMembers.length > 0)
                .map(item => ({
                ...item,
                dueDate: item.dueDate ? new Date(item.dueDate) : item.dueDate
            }));
        });
    }

    protected consultProject(project: ProjectListing) {
        this.router.navigate(['/pages/projects', project.id]);
    }
}
