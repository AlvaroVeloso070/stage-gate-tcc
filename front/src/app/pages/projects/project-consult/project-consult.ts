import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Project, ProjectStatus, UserTypeEnum } from '@/pages/projects/entities/projectConsult';
import { GatesProgressStepper } from '@/pages/projects/components/gates-progress-stepper/gates-progress-stepper';

@Component({
    selector: 'app-project-consult',
    imports: [TableModule, GatesProgressStepper],
    templateUrl: './project-consult.html',
    styleUrl: './project-consult.scss'
})
export class ProjectConsult implements OnInit {
    protected activeGate: WritableSignal<number> = signal(1);
    protected isAllGatesCompleted: WritableSignal<boolean> = signal(false);

    protected project: Project = {
        id: '00000000-0000-0001-0004-000000000003',
        title: 'In-Progress G2 Project 3 (Soon)',
        researchQuestion: 'RQ G2P3',
        status: ProjectStatus.IN_PROGRESS,
        startDate: '2024-02-03',
        groupMembers: [
            {
                id: '0d1e4648-b8bb-44ed-9af9-44cb57bf08b6',
                name: 'Álvaro Veloso',
                email: 'student.in-progressg2project3(soon)@ufg.br',
                type: UserTypeEnum.STUDENT
            },
            {
                id: '0d1e4648-b8bb-44ed-9af9-44cb57bf08b6',
                name: 'João Pedro',
                email: 'student.in-progressg2project3(soon)@ufg.br',
                type: UserTypeEnum.STUDENT
            },
            {
                id: '0d1e4648-b8bb-44ed-9af9-44cb57bf08b6',
                name: 'Thiago Telho',
                email: 'student.in-progressg2project3(soon)@ufg.br',
                type: UserTypeEnum.STUDENT
            },

            {
                id: '0d1e4648-b8bb-44ed-9af9-44cb57bf08b6',
                name: 'Guilherme S.',
                email: 'student.in-progressg2project3(soon)@ufg.br',
                type: UserTypeEnum.STUDENT
            }
        ],
        gates: [
            {
                id: '8027600d-94e1-4255-b828-1089515f39c5',
                number: 1,
                name: 'GATE_1',
                dueDate: '2024-03-01',
                approved: true
            },
            {
                id: '51049b0f-17f9-46d9-80de-ac9bd5535f4b',
                number: 2,
                name: 'GATE_2',
                dueDate: '2025-11-20',
                approved: true
            },
            {
                id: '8027600d-94e1-4255-b828-1089515f39c5',
                number: 3,
                name: 'GATE_3',
                dueDate: '2024-03-01',
                approved: true
            },
            {
                id: '51049b0f-17f9-46d9-80de-ac9bd5535f4b',
                number: 4,
                name: 'GATE_4',
                dueDate: '2025-11-20',
                approved: false
            }
        ]
    };

    ngOnInit(): void {
        this.handleGates();
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
