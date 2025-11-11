import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DueDateStatus, ProjectListing } from '@/pages/projects/entities/projectListing';
import { Button } from 'primeng/button';
import { TagProjectStatus } from '@/pages/projects/components/tag-project-status/tag-project-status';
import { Router } from '@angular/router';

@Component({
    selector: 'app-projects',
    imports: [TableModule, Button, TagProjectStatus],
    templateUrl: './projects.html',
    styleUrl: './projects.scss'
})
export class Projects {
    private readonly router: Router = inject(Router);

    protected projects: ProjectListing[] = [
        {
            id: '00000000-0000-0001-0003-000000000001',
            title: 'In-Progress G1 Project 1 (Late)',
            groupMembers: ['Student for In-Progress G1 Project 1 (Late)'],
            currentGateNumber: 1,
            dueDate: '2025-10-31',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            id: '00000000-0000-0001-0003-000000000002',
            title: 'In-Progress G1 Project 2 (Soon)',
            groupMembers: [],
            currentGateNumber: 1,
            dueDate: '2025-11-15',
            dueDateStatus: DueDateStatus.WARNING
        },
        {
            id: '00000000-0000-0001-0003-000000000003',
            title: 'In-Progress G1 Project 3 (Later)',
            groupMembers: ['Student for In-Progress G1 Project 3 (Later)'],
            currentGateNumber: 1,
            dueDate: '2025-11-30',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '00000000-0000-0001-0004-000000000001',
            title: 'In-Progress G2 Project 1 (Late)',
            groupMembers: ['Student for In-Progress G2 Project 1 (Late)'],
            currentGateNumber: 2,
            dueDate: '2025-11-05',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            id: '00000000-0000-0001-0004-000000000002',
            title: 'In-Progress G2 Project 2 (Late)',
            groupMembers: ['Student for In-Progress G2 Project 2 (Late)'],
            currentGateNumber: 2,
            dueDate: '2025-11-07',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            id: '00000000-0000-0001-0004-000000000003',
            title: 'In-Progress G2 Project 3 (Soon)',
            groupMembers: ['Student for In-Progress G2 Project 3 (Soon)'],
            currentGateNumber: 2,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '00000000-0000-0001-0004-000000000004',
            title: 'In-Progress G2 Project 4 (Soon)',
            groupMembers: ['Student for In-Progress G2 Project 4 (Soon)'],
            currentGateNumber: 2,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '00000000-0000-0001-0004-000000000005',
            title: 'In-Progress G2 Project 5 (Soon)',
            groupMembers: ['Student for In-Progress G2 Project 5 (Soon)'],
            currentGateNumber: 2,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '00000000-0000-0001-0004-000000000006',
            title: 'In-Progress G2 Project 6 (Later)',
            groupMembers: ['Student for In-Progress G2 Project 6 (Later)'],
            currentGateNumber: 2,
            dueDate: '2025-11-25',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '00000000-0000-0001-0004-000000000007',
            title: 'In-Progress G2 Project 7 (Later)',
            groupMembers: ['Student for In-Progress G2 Project 7 (Later)'],
            currentGateNumber: 2,
            dueDate: '2025-12-10',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: 'ff9c76b1-19f9-493e-b937-fec93a21fc6a',
            title: 'In-Progress G3-Late Project 1',
            groupMembers: ['Student for In-Progress G3-Late Project 1'],
            currentGateNumber: 3,
            dueDate: '2025-10-26',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            id: '74576757-91c7-4f56-b417-c131b3d95daa',
            title: 'In-Progress G3-Late Project 2',
            groupMembers: ['Student for In-Progress G3-Late Project 2'],
            currentGateNumber: 3,
            dueDate: '2025-10-26',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            id: '5b3b3136-733c-4b0b-8c85-8a4808f9e2ab',
            title: 'In-Progress G3-Late Project 3',
            groupMembers: ['Student for In-Progress G3-Late Project 3'],
            currentGateNumber: 3,
            dueDate: '2025-10-26',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            id: 'a98e4b42-e792-4efe-8b31-b12e2353798e',
            title: 'In-Progress G3-Late Project 4',
            groupMembers: ['Student for In-Progress G3-Late Project 4'],
            currentGateNumber: 3,
            dueDate: '2025-10-26',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            id: '700910f3-0f8c-4b6f-9663-84e55fc53f25',
            title: 'In-Progress G3-Late Project 5',
            groupMembers: ['Student for In-Progress G3-Late Project 5'],
            currentGateNumber: 3,
            dueDate: '2025-10-26',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            id: '0c5e201d-a823-4f2f-9c57-994cc697390b',
            title: 'In-Progress G3-Late Project 6',
            groupMembers: ['Student for In-Progress G3-Late Project 6'],
            currentGateNumber: 3,
            dueDate: '2025-10-26',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            id: '1c472a73-7d00-4daa-b4ae-1fe4d8288234',
            title: 'In-Progress G3-Late Project 7',
            groupMembers: ['Student for In-Progress G3-Late Project 7'],
            currentGateNumber: 3,
            dueDate: '2025-10-26',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            id: 'bda52fc8-e031-4671-acc1-49ec27da3b42',
            title: 'In-Progress G3-Soon Project 1',
            groupMembers: ['Student for In-Progress G3-Soon Project 1'],
            currentGateNumber: 3,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '80561502-f43a-4696-a73c-a6753b797cda',
            title: 'In-Progress G3-Soon Project 2',
            groupMembers: ['Student for In-Progress G3-Soon Project 2'],
            currentGateNumber: 3,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: 'c34eafc1-98b1-4c58-b44b-f3d70fc1a225',
            title: 'In-Progress G3-Soon Project 3',
            groupMembers: ['Student for In-Progress G3-Soon Project 3'],
            currentGateNumber: 3,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '3daa2bf7-eb4c-4a37-b5be-7b9c6a3fd535',
            title: 'In-Progress G3-Soon Project 4',
            groupMembers: ['Student for In-Progress G3-Soon Project 4'],
            currentGateNumber: 3,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: 'b7aeb7fb-342f-49bb-8dd3-482451c62ed6',
            title: 'In-Progress G3-Soon Project 5',
            groupMembers: ['Student for In-Progress G3-Soon Project 5'],
            currentGateNumber: 3,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: 'bdf6e591-a390-42de-844c-8ebc682f7604',
            title: 'In-Progress G3-Soon Project 6',
            groupMembers: ['Student for In-Progress G3-Soon Project 6'],
            currentGateNumber: 3,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: 'eb782eea-135c-475c-9e69-9cd8076481fb',
            title: 'In-Progress G3-Soon Project 7',
            groupMembers: ['Student for In-Progress G3-Soon Project 7'],
            currentGateNumber: 3,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '2357e183-75db-4aa7-920a-8dfc96212155',
            title: 'In-Progress G3-Soon Project 8',
            groupMembers: ['Student for In-Progress G3-Soon Project 8'],
            currentGateNumber: 3,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '9582b284-d8d2-44a9-b4d7-0208a578676e',
            title: 'In-Progress G3-Later Project 1',
            groupMembers: ['Student for In-Progress G3-Later Project 1'],
            currentGateNumber: 3,
            dueDate: '2025-12-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '282ccdfd-69ed-4be9-bdd5-94cd578ad9aa',
            title: 'In-Progress G3-Later Project 2',
            groupMembers: ['Student for In-Progress G3-Later Project 2'],
            currentGateNumber: 3,
            dueDate: '2025-12-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '20ed5b01-e92c-4109-a4ae-3a5dc89821d5',
            title: 'In-Progress G3-Later Project 3',
            groupMembers: ['Student for In-Progress G3-Later Project 3'],
            currentGateNumber: 3,
            dueDate: '2025-12-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: 'e1da4837-93d5-4a67-9d06-da6fdf628b55',
            title: 'In-Progress G3-Later Project 4',
            groupMembers: ['Student for In-Progress G3-Later Project 4'],
            currentGateNumber: 3,
            dueDate: '2025-12-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '0a3d3279-b60a-4a95-967d-3da382c52412',
            title: 'In-Progress G3-Later Project 5',
            groupMembers: ['Student for In-Progress G3-Later Project 5'],
            currentGateNumber: 3,
            dueDate: '2025-12-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '00000000-0000-0001-0006-000000000001',
            title: 'In-Progress G4 Project 1 (Soon)',
            groupMembers: ['Student for In-Progress G4 Project 1 (Soon)'],
            currentGateNumber: 4,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '00000000-0000-0001-0007-000000000001',
            title: 'In-Progress G5 Project 1 (Late)',
            groupMembers: ['Student for In-Progress G5 Project 1 (Late)'],
            currentGateNumber: 5,
            dueDate: '2025-10-21',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            id: '00000000-0000-0001-0007-000000000002',
            title: 'In-Progress G5 Project 2 (Soon)',
            groupMembers: ['Student for In-Progress G5 Project 2 (Soon)'],
            currentGateNumber: 5,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '00000000-0000-0001-0007-000000000003',
            title: 'In-Progress G5 Project 3 (Soon)',
            groupMembers: ['Student for In-Progress G5 Project 3 (Soon)'],
            currentGateNumber: 5,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '00000000-0000-0001-0007-000000000004',
            title: 'In-Progress G5 Project 4 (Later)',
            groupMembers: ['Student for In-Progress G5 Project 4 (Later)'],
            currentGateNumber: 5,
            dueDate: '2025-12-05',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '00000000-0000-0001-0008-000000000001',
            title: 'In-Progress G6 Project 1 (Late)',
            groupMembers: ['Student for In-Progress G6 Project 1 (Late)'],
            currentGateNumber: 6,
            dueDate: '2025-11-07',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            id: '00000000-0000-0001-0008-000000000002',
            title: 'In-Progress G6 Project 2 (Late)',
            groupMembers: ['Student for In-Progress G6 Project 2 (Late)'],
            currentGateNumber: 6,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            id: '00000000-0000-0001-0008-000000000003',
            title: 'In-Progress G6 Project 3 (Soon)',
            groupMembers: ['Student for In-Progress G6 Project 3 (Soon)'],
            currentGateNumber: 6,
            dueDate: '2025-11-20',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '00000000-0000-0001-0008-000000000004',
            title: 'In-Progress G6 Project 4 (Later)',
            groupMembers: ['Student for In-Progress G6 Project 4 (Later)'],
            currentGateNumber: 6,
            dueDate: '2025-11-25',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            id: '00000000-0000-0001-0008-000000000005',
            title: 'In-Progress G6 Project 5 (Later)',
            groupMembers: ['Student for In-Progress G6 Project 5 (Later)'],
            currentGateNumber: 6,
            dueDate: '2025-11-28',
            dueDateStatus: DueDateStatus.ON_TIME
        }
    ];

    protected consultProject(project: ProjectListing) {
        this.router.navigate(['/pages/projects', project.id]);
    }
}
