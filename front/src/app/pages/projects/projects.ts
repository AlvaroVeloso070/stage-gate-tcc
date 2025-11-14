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

interface FilterOption {
    label: string;
    value: string | number | DueDateStatus;
}

@Component({
    selector: 'app-projects',
    imports: [TableModule, Button, TagProjectDueStatus, DatePipe, InputTextModule, MultiSelectModule, FormsModule, SelectButtonModule],
    templateUrl: './projects.html',
    styleUrl: './projects.scss'
})
export class Projects implements OnInit {
    private coordinationService: CoordinationService = inject(CoordinationService);
    private readonly router: Router = inject(Router);

    protected projects!: ProjectListing[];
    protected filteredProjects!: ProjectListing[];

    // Filtros
    protected searchText: string = '';
    protected selectedDueStatuses: DueDateStatus[] = [];
    protected selectedGates: number[] = [];
    protected selectedMemberCounts: string[] = [];

    // Opções para os filtros
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

    protected memberCountOptions: FilterOption[] = [
        { label: 'Sem membros', value: '0' },
        { label: '1-2 membros', value: '1-2' },
        { label: '3-4 membros', value: '3-4' },
        { label: '5+ membros', value: '5+' }
    ];

    protected activeFiltersCount: number = 0;

    ngOnInit(): void {
        this.coordinationService.getAllProjects().subscribe((projects) => {
            this.projects = projects;
            this.filteredProjects = projects;
        });
    }

    protected consultProject(project: ProjectListing) {
        this.router.navigate(['/pages/projects', project.id]);
    }

    protected applyFilters(): void {
        this.filteredProjects = this.projects.filter((project) => {
            // Filtro de texto de busca
            const matchesSearch = !this.searchText || project.title.toLowerCase().includes(this.searchText.toLowerCase()) || project.groupMembers.some((member) => member.toLowerCase().includes(this.searchText.toLowerCase()));

            // Filtro de status de prazo
            const matchesDueStatus = this.selectedDueStatuses.length === 0 || (project.dueDateStatus && this.selectedDueStatuses.includes(project.dueDateStatus));

            // Filtro de gate atual
            const matchesGate = this.selectedGates.length === 0 || (project.currentGateNumber && this.selectedGates.includes(project.currentGateNumber));

            // Filtro de quantidade de membros
            const matchesMemberCount =
                this.selectedMemberCounts.length === 0 ||
                this.selectedMemberCounts.some((range) => {
                    const count = project.groupMembers.length;
                    switch (range) {
                        case '0':
                            return count === 0;
                        case '1-2':
                            return count >= 1 && count <= 2;
                        case '3-4':
                            return count >= 3 && count <= 4;
                        case '5+':
                            return count >= 5;
                        default:
                            return true;
                    }
                });

            return matchesSearch && matchesDueStatus && matchesGate && matchesMemberCount;
        });

        this.updateActiveFiltersCount();
    }

    protected updateActiveFiltersCount(): void {
        this.activeFiltersCount = 0;
        if (this.searchText) this.activeFiltersCount++;
        if (this.selectedDueStatuses.length > 0) this.activeFiltersCount++;
        if (this.selectedGates.length > 0) this.activeFiltersCount++;
        if (this.selectedMemberCounts.length > 0) this.activeFiltersCount++;
    }

    protected clearFilters(): void {
        this.searchText = '';
        this.selectedDueStatuses = [];
        this.selectedGates = [];
        this.selectedMemberCounts = [];
        this.filteredProjects = this.projects;
        this.activeFiltersCount = 0;
    }
}
