import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import { DueDateStatus, ProjectListing } from '@/pages/projects/entities/projectListing';
import { Button } from 'primeng/button';
import { TagProjectDueStatus } from '@/pages/projects/components/tag-project-due-status/tag-project-due-status';
import {ActivatedRoute, Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import { CoordinationService } from '@/services/coordination.service';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import {Select} from "primeng/select";
import {FilterOption} from "@/shared/dtos/FilterOption";
import {TagMeetingStatus} from "@/pages/meetings/components/tag-meeting-status/tag-meeting-status";
import {startOfDay} from "date-fns";
import {ProjectFilterEnum} from "@/pages/projects/entities/ProjectFilterEnum";
import {ProjectStatus} from "@/pages/projects/entities/project";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {UserFormDialog} from "@/pages/users/components/user-form-dialog/user-form-dialog";
import {ProjectFormDialog} from "@/pages/projects/components/project-form-dialog/project-form-dialog";

@Component({
    selector: 'app-projects',
    imports: [TableModule, Button, TagProjectDueStatus, DatePipe, InputTextModule, MultiSelectModule, FormsModule, SelectButtonModule, Select, TagMeetingStatus],
    templateUrl: './projects.html',
    styleUrl: './projects.scss'
})
export class Projects implements OnInit {
    private readonly coordinationService: CoordinationService = inject(CoordinationService);
    private readonly router: Router = inject(Router);
    private readonly route : ActivatedRoute = inject(ActivatedRoute);
    private readonly dialogService : DialogService = inject(DialogService);
    private dialogRef : DynamicDialogRef = inject(DynamicDialogRef);

    @ViewChild('dt') table!: Table;

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
        { label: 'Gate 5', value: 5 },
        { label: 'Gate 6', value: 6 }
    ];

    ngOnInit(): void {
        this.listProjects();
    }

    private listProjects() {
        this.coordinationService.getAllProjects().subscribe((projects) => {
            this.projects = projects
                // TODO - Remover este filter futuramente quando for para produção
                .filter(item => item.currentGateNumber && item.dueDate && item.dueDateStatus && item.groupMembers.length > 0)
                .map(item => ({
                    ...item,
                    dueDate: item.dueDate ? startOfDay(item.dueDate) : item.dueDate
                }));
            this.applyPreFilters();
        });
    }

    private applyPreFilters() {
        this.route.queryParams.subscribe(params => {
            let filter = params['filter'];
            if (filter){
                this.table.filters = {
                    ...this.table.filters,
                    dueDateStatus: [
                        {
                            value: this.getFilterProjectStatus(filter),
                            matchMode: 'equals'
                        }
                    ],
                    // TODO - A regra no backend está para trazer os projetos entre a data atual e -7 dias na métrica de 'almostLate'. Ajustar este filtro do redirecionamento da dashboard
                    // dueDate: [
                    //     {
                    //         value: startOfDay(new Date()),
                    //         matchMode: 'dateBefore'
                    //     },
                    //     {
                    //         value: () => {
                    //             let date = startOfDay(new Date());
                    //             date.setDate(date.getDate() - 7)
                    //             return date;
                    //         },
                    //         matchMode: 'dateBefore',
                    //         operator: 'and'
                    //     }
                    // ]
                }

                this.table._filter();
            }
        });
    }

    private getFilterProjectStatus(filter : any){
        if (filter === ProjectFilterEnum.ALMOST_LATE.toString()){
            return DueDateStatus.WARNING;
        } else if (filter === ProjectFilterEnum.LATE.toString()){
            return DueDateStatus.OVERDUE
        }else {
            return DueDateStatus.ON_TIME;
        }
    }

    protected consultProject(project: ProjectListing) {
        this.router.navigate(['/pages/projects', project.id]);
    }

    protected newProject(){
        this.dialogRef = this.dialogService.open(ProjectFormDialog, {
            header: 'Incluir novo Projeto',
            focusOnShow: false,
            closable: true,
            closeOnEscape: true,
            modal: true,
            width: '680px',
            height: 'auto'
        })

        this.dialogRef.onClose.subscribe((project) => {
            if (project?.id){
                this.listProjects();
            }
        })
    }
}
