import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DueDateStatus, ProjectListing } from '@/pages/projects/entities/projectListing';
import { Button } from 'primeng/button';
import { TagProjectDueStatus } from '@/pages/projects/components/tag-project-due-status/tag-project-due-status';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CoordinationService } from '@/services/coordination.service';

@Component({
    selector: 'app-projects',
    imports: [TableModule, Button, TagProjectDueStatus, DatePipe],
    templateUrl: './projects.html',
    styleUrl: './projects.scss'
})
export class Projects implements OnInit {
    private coordinationService : CoordinationService = inject(CoordinationService);
    private readonly router: Router = inject(Router);

    protected projects !: ProjectListing[];

    ngOnInit(): void {
        this.coordinationService.getAllProjects().subscribe(projects => {
            this.projects = projects;
        })
    }

    protected consultProject(project: ProjectListing) {
        this.router.navigate(['/pages/projects', project.id]);
    }
}
