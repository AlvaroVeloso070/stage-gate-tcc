import { Component, input, InputSignal } from '@angular/core';
import { GateResultEnum, MeetingConsult, MeetingType, UserTypeEnum } from '@/pages/projects/entities/project';
import { Timeline } from 'primeng/timeline';
import { Card } from 'primeng/card';
import { DatePipe, NgClass } from '@angular/common';
import { GATES } from '@/constants/gates';
import { Button } from 'primeng/button';
import { TagStatusGateApproval } from '@/pages/projects/components/tag-status-gate-approval/tag-status-gate-approval';

@Component({
    selector: 'project-meetings',
    imports: [Timeline, Card, DatePipe, Button, NgClass, TagStatusGateApproval],
    templateUrl: './project-meetings.html',
    styleUrl: './project-meetings.scss'
})
export class ProjectMeetings {
    public projectId: InputSignal<string> = input.required();

    protected meetings: MeetingConsult[] = [
        {
            id: '00000000-0000-0002-0001-000000000001',
            type: MeetingType.GATE,
            professor: {
                id: '00000000-2222-0000-0000-000000000001',
                name: 'Professor 1',
                email: 'professor1@ufg.br',
                type: UserTypeEnum.PROFESSOR
            },
            stageGateNumber: 1,
            participants: [],
            scheduleDate: '2025-03-10',
            startTime: '09:00:00',
            endTime: '10:00:00',
            status: 'COMPLETED',
            report: {
                id: 'c1d11111-aaaa-4675-b528-9cc65ed91111',
                feedback: 'Gate 1 concluído com sucesso. Boa definição de tema e objetivos.',
                gateResult: GateResultEnum.APPROVED,
                reportDate: '2025-03-10T00:00:00'
            }
        },
        {
            id: '00000000-0000-0002-0001-000000000101',
            type: MeetingType.STAGE,
            professor: {
                id: '00000000-2222-0000-0000-000000000001',
                name: 'Professor 1',
                email: 'professor1@ufg.br',
                type: UserTypeEnum.PROFESSOR
            },
            stageGateNumber: 1,
            participants: [],
            scheduleDate: '2025-04-05',
            startTime: '14:00:00',
            endTime: '15:00:00',
            status: 'COMPLETED',
            report: {
                id: 'd11111e1-bf62-4675-b528-9cc65ed92210',
                feedback: 'Bom progresso na fundamentação teórica.',
                gateResult: GateResultEnum.PENDING,
                reportDate: '2025-04-05T00:00:00'
            }
        },
        {
            id: '00000000-0000-0002-0001-000000000002',
            type: MeetingType.GATE,
            professor: {
                id: '00000000-2222-0000-0000-000000000002',
                name: 'Professor 2',
                email: 'professor2@ufg.br',
                type: UserTypeEnum.PROFESSOR
            },
            stageGateNumber: 2,
            participants: [],
            scheduleDate: '2025-05-10',
            startTime: '10:00:00',
            endTime: '11:00:00',
            status: 'COMPLETED',
            report: {
                id: 'e2a00054-bf62-4675-b528-9cc65ed92202',
                feedback: 'Excellent progress, gate 2 approved.',
                gateResult: GateResultEnum.APPROVED,
                reportDate: '2025-05-10T00:00:00'
            }
        },
        {
            id: '00000000-0000-0002-0001-000000000202',
            type: MeetingType.STAGE,
            professor: {
                id: '00000000-2222-0000-0000-000000000002',
                name: 'Professor 2',
                email: 'professor2@ufg.br',
                type: UserTypeEnum.PROFESSOR
            },
            stageGateNumber: 2,
            participants: [],
            scheduleDate: '2025-06-02',
            startTime: '09:30:00',
            endTime: '10:30:00',
            status: 'SCHEDULED',
            report: {
                id: 'e22222ee-bf62-4675-b528-9cc65ed93333',
                feedback: 'Preparação para metodologia experimental.',
                gateResult: GateResultEnum.PENDING,
                reportDate: '2025-06-02T00:00:00'
            }
        },
        {
            id: '00000000-0000-0002-0001-000000000003',
            type: MeetingType.GATE,
            professor: {
                id: '00000000-2222-0000-0000-000000000003',
                name: 'Professor 3',
                email: 'professor3@ufg.br',
                type: UserTypeEnum.PROFESSOR
            },
            stageGateNumber: 3,
            participants: [],
            scheduleDate: '2025-07-15',
            startTime: '09:00:00',
            endTime: '10:00:00',
            status: 'COMPLETED',
            report: {
                id: 'f3333333-bf62-4675-b528-9cc65ed94444',
                feedback: 'Gate 3 aprovado, metodologia validada.',
                gateResult: GateResultEnum.APPROVED,
                reportDate: '2025-07-15T00:00:00'
            }
        },
        {
            id: '00000000-0000-0002-0001-000000000303',
            type: MeetingType.STAGE,
            professor: {
                id: '00000000-2222-0000-0000-000000000003',
                name: 'Professor 3',
                email: 'professor3@ufg.br',
                type: UserTypeEnum.PROFESSOR
            },
            stageGateNumber: 3,
            participants: [],
            scheduleDate: '2025-08-20',
            startTime: '15:00:00',
            endTime: '16:00:00',
            status: 'SCHEDULED',
            report: {
                id: 'f3444444-bf62-4675-b528-9cc65ed95555',
                feedback: 'Análise de resultados preliminares em andamento.',
                gateResult: GateResultEnum.PENDING,
                reportDate: '2025-08-20T00:00:00'
            }
        },
        {
            id: '00000000-0000-0002-0001-000000000004',
            type: MeetingType.GATE,
            professor: {
                id: '00000000-2222-0000-0000-000000000004',
                name: 'Professor 4',
                email: 'professor4@ufg.br',
                type: UserTypeEnum.PROFESSOR
            },
            stageGateNumber: 4,
            participants: [],
            scheduleDate: '2025-10-05',
            startTime: '09:00:00',
            endTime: '10:30:00',
            status: 'SCHEDULED',
            report: {
                id: 'g4444444-bf62-4675-b528-9cc65ed96666',
                feedback: 'Último gate agendado. Revisão final pendente.',
                gateResult: GateResultEnum.REJECTED,
                reportDate: '2025-10-05T00:00:00'
            }
        }
    ];
    protected readonly MeetingType = MeetingType;

    protected isGateMeeting(meeting: MeetingConsult): boolean {
        return meeting.type === MeetingType.GATE;
    }

    protected getTimelineMarker(meeting: MeetingConsult): string {
        return this.isGateMeeting(meeting) ? `G${meeting.stageGateNumber}` : `S${meeting.stageGateNumber}`;
    }

    protected getTimelineHeader(meeting: MeetingConsult) {
        if (meeting.type === MeetingType.GATE) {
            let gateName = GATES.find((gate) => gate.value === meeting.stageGateNumber)?.name;
            return `Reunião de Gate ${meeting.stageGateNumber} - ${gateName}`;
        } else {
            return `Acompanhamento - Stage ${meeting.stageGateNumber}`;
        }
    }

    protected readonly GateResultEnum = GateResultEnum;
}
