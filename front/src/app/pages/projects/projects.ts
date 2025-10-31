import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DueDateStatus, ProjectListing } from '@/pages/projects/entities/projectListing';
import { Button } from 'primeng/button';
import { TagProjectStatus } from '@/pages/projects/components/tag-project-status/tag-project-status';

@Component({
    selector: 'app-projects',
    imports: [TableModule, Button, TagProjectStatus],
    templateUrl: './projects.html',
    styleUrl: './projects.scss'
})
export class Projects {
    protected projects: ProjectListing[] = [
        {
            title: 'In-Progress G1 Project 1 (Late)',
            groupMembers: ['Student for In-Progress G1 Project 1 (Late)'],
            currentGateNumber: 1,
            dueDate: '2025-10-20',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            title: 'In-Progress G1 Project 3 (Later)',
            groupMembers: ['Student for In-Progress G1 Project 3 (Later)'],
            currentGateNumber: 1,
            dueDate: '2025-11-19',
            dueDateStatus: DueDateStatus.WARNING
        },
        {
            title: 'In-Progress G2 Project 1 (Late)',
            groupMembers: ['Student for In-Progress G2 Project 1 (Late)'],
            currentGateNumber: 2,
            dueDate: '2025-10-25',
            dueDateStatus: DueDateStatus.WARNING
        },
        {
            title: 'In-Progress G2 Project 2 (Late)',
            groupMembers: ['Student for In-Progress G2 Project 2 (Late)'],
            currentGateNumber: 2,
            dueDate: '2025-10-27',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            title: 'In-Progress G2 Project 3 (Soon)',
            groupMembers: ['Student for In-Progress G2 Project 3 (Soon)'],
            currentGateNumber: 2,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G2 Project 4 (Soon)',
            groupMembers: ['Student for In-Progress G2 Project 4 (Soon)'],
            currentGateNumber: 2,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G2 Project 5 (Soon)',
            groupMembers: ['Student for In-Progress G2 Project 5 (Soon)'],
            currentGateNumber: 2,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G2 Project 6 (Later)',
            groupMembers: ['Student for In-Progress G2 Project 6 (Later)'],
            currentGateNumber: 2,
            dueDate: '2025-11-14',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G2 Project 7 (Later)',
            groupMembers: ['Student for In-Progress G2 Project 7 (Later)'],
            currentGateNumber: 2,
            dueDate: '2025-11-29',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G3-Late Project 1',
            groupMembers: ['Student for In-Progress G3-Late Project 1'],
            currentGateNumber: 3,
            dueDate: '2025-10-15',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            title: 'In-Progress G3-Late Project 2',
            groupMembers: ['Student for In-Progress G3-Late Project 2'],
            currentGateNumber: 3,
            dueDate: '2025-10-15',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            title: 'In-Progress G3-Late Project 3',
            groupMembers: ['Student for In-Progress G3-Late Project 3'],
            currentGateNumber: 3,
            dueDate: '2025-10-15',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            title: 'In-Progress G3-Late Project 4',
            groupMembers: ['Student for In-Progress G3-Late Project 4'],
            currentGateNumber: 3,
            dueDate: '2025-10-15',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            title: 'In-Progress G3-Late Project 5',
            groupMembers: ['Student for In-Progress G3-Late Project 5'],
            currentGateNumber: 3,
            dueDate: '2025-10-15',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            title: 'In-Progress G3-Late Project 6',
            groupMembers: ['Student for In-Progress G3-Late Project 6'],
            currentGateNumber: 3,
            dueDate: '2025-10-15',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            title: 'In-Progress G3-Late Project 7',
            groupMembers: ['Student for In-Progress G3-Late Project 7'],
            currentGateNumber: 3,
            dueDate: '2025-10-15',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            title: 'In-Progress G3-Soon Project 1',
            groupMembers: ['Student for In-Progress G3-Soon Project 1'],
            currentGateNumber: 3,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G3-Soon Project 2',
            groupMembers: ['Student for In-Progress G3-Soon Project 2'],
            currentGateNumber: 3,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G3-Soon Project 3',
            groupMembers: ['Student for In-Progress G3-Soon Project 3'],
            currentGateNumber: 3,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G3-Soon Project 4',
            groupMembers: ['Student for In-Progress G3-Soon Project 4'],
            currentGateNumber: 3,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G3-Soon Project 5',
            groupMembers: ['Student for In-Progress G3-Soon Project 5'],
            currentGateNumber: 3,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G3-Soon Project 6',
            groupMembers: ['Student for In-Progress G3-Soon Project 6'],
            currentGateNumber: 3,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G3-Soon Project 7',
            groupMembers: ['Student for In-Progress G3-Soon Project 7'],
            currentGateNumber: 3,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G3-Soon Project 8',
            groupMembers: ['Student for In-Progress G3-Soon Project 8'],
            currentGateNumber: 3,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G3-Later Project 1',
            groupMembers: ['Student for In-Progress G3-Later Project 1'],
            currentGateNumber: 3,
            dueDate: '2025-12-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G3-Later Project 2',
            groupMembers: ['Student for In-Progress G3-Later Project 2'],
            currentGateNumber: 3,
            dueDate: '2025-12-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G3-Later Project 3',
            groupMembers: ['Student for In-Progress G3-Later Project 3'],
            currentGateNumber: 3,
            dueDate: '2025-12-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G3-Later Project 4',
            groupMembers: ['Student for In-Progress G3-Later Project 4'],
            currentGateNumber: 3,
            dueDate: '2025-12-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G3-Later Project 5',
            groupMembers: ['Student for In-Progress G3-Later Project 5'],
            currentGateNumber: 3,
            dueDate: '2025-12-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G4 Project 1 (Soon)',
            groupMembers: ['Student for In-Progress G4 Project 1 (Soon)'],
            currentGateNumber: 4,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G5 Project 1 (Late)',
            groupMembers: ['Student for In-Progress G5 Project 1 (Late)'],
            currentGateNumber: 5,
            dueDate: '2025-10-10',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            title: 'In-Progress G5 Project 2 (Soon)',
            groupMembers: ['Student for In-Progress G5 Project 2 (Soon)'],
            currentGateNumber: 5,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G5 Project 3 (Soon)',
            groupMembers: ['Student for In-Progress G5 Project 3 (Soon)'],
            currentGateNumber: 5,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G5 Project 4 (Later)',
            groupMembers: ['Student for In-Progress G5 Project 4 (Later)'],
            currentGateNumber: 5,
            dueDate: '2025-11-24',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G6 Project 1 (Late)',
            groupMembers: ['Student for In-Progress G6 Project 1 (Late)'],
            currentGateNumber: 6,
            dueDate: '2025-10-27',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            title: 'In-Progress G6 Project 2 (Late)',
            groupMembers: ['Student for In-Progress G6 Project 2 (Late)'],
            currentGateNumber: 6,
            dueDate: '2025-10-29',
            dueDateStatus: DueDateStatus.OVERDUE
        },
        {
            title: 'In-Progress G6 Project 3 (Soon)',
            groupMembers: ['Student for In-Progress G6 Project 3 (Soon)'],
            currentGateNumber: 6,
            dueDate: '2025-11-09',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G6 Project 4 (Later)',
            groupMembers: ['Student for In-Progress G6 Project 4 (Later)'],
            currentGateNumber: 6,
            dueDate: '2025-11-14',
            dueDateStatus: DueDateStatus.ON_TIME
        },
        {
            title: 'In-Progress G6 Project 5 (Later)',
            groupMembers: ['Student for In-Progress G6 Project 5 (Later)'],
            currentGateNumber: 6,
            dueDate: '2025-11-17',
            dueDateStatus: DueDateStatus.ON_TIME
        }
    ];
}
