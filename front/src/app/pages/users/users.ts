import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TagModule} from 'primeng/tag';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmationService, MessageService} from 'primeng/api';

import {User} from '@/pages/users/entities/user';
import {UserService} from '@/services/user.service';
import {Select} from "primeng/select";
import {TagUserType} from "@/pages/users/components/tag-user-type/tag-user-type";
import {UserTypeEnum} from "@/pages/projects/entities/project";
import {ToastService} from "@/services/toast.service";
import {DialogService} from "primeng/dynamicdialog";
import {UserFormDialog} from "@/pages/users/components/user-form-dialog/user-form-dialog";

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, Button, InputTextModule, SelectButtonModule, DialogModule, ToastModule, ConfirmDialogModule, TagModule, ToolbarModule, TooltipModule, Select, TagUserType],
    providers: [MessageService, ConfirmationService],
    templateUrl: './users.html',
    styleUrls: ['./users.scss']
})
export class Users implements OnInit {
    private readonly userService : UserService = inject(UserService);
    private readonly toastService : ToastService = inject(ToastService);
    private readonly confirmationService : ConfirmationService = inject(ConfirmationService);
    private readonly dialogService : DialogService = inject(DialogService);

    protected users: User[] = [];

    protected userTypeOptions = [
        { label: 'Estudante', value: UserTypeEnum.STUDENT },
        { label: 'Professor', value: UserTypeEnum.PROFESSOR },
        { label: 'Coordenador', value: UserTypeEnum.COORDINATOR }
    ];

    ngOnInit(): void {
        this.users = [
            {
                id: '1',
                name: 'Ana Carolina Pereira',
                email: 'ana.pereira@student.edu',
                type: UserTypeEnum.STUDENT
            },
            {
                id: '2',
                name: 'Dr. Roberto Lima',
                email: 'roberto.lima@university.edu',
                type: UserTypeEnum.PROFESSOR
            },
            {
                id: '3',
                name: 'Profa. Dra. Lucia Fernandes',
                email: 'lucia.fernandes@university.edu',
                type: UserTypeEnum.COORDINATOR
            },
            {
                id: '4',
                name: 'Pedro Henrique Costa',
                email: 'pedro.costa@student.edu',
                type: UserTypeEnum.STUDENT
            },
            {
                id: '5',
                name: 'Dr. Eduardo Martins',
                email: 'eduardo.martins@university.edu',
                type: UserTypeEnum.PROFESSOR
            },
            {
                id: '6',
                name: 'João Silva Santos',
                email: 'joao.santos@student.edu',
                type: UserTypeEnum.STUDENT
            },
            {
                id: '7',
                name: 'Prof. Carlos Oliveira',
                email: 'carlos.oliveira@university.edu',
                type: UserTypeEnum.COORDINATOR
            },
            {
                id: '8',
                name: 'Dra. Maria Santos',
                email: 'maria.santos@university.edu',
                type: UserTypeEnum.PROFESSOR
            },
            {
                id: '9',
                name: 'Beatriz Almeida Silva',
                email: 'beatriz.almeida@student.edu',
                type: UserTypeEnum.STUDENT
            },
            {
                id: '10',
                name: 'Prof. Dr. Fernando Costa',
                email: 'fernando.costa@university.edu',
                type: UserTypeEnum.PROFESSOR
            },
            {
                id: '11',
                name: 'Mariana Oliveira Rodrigues',
                email: 'mariana.rodrigues@student.edu',
                type: UserTypeEnum.STUDENT
            },
            {
                id: '12',
                name: 'Dr. Alexandre Ferreira',
                email: 'alexandre.ferreira@university.edu',
                type: UserTypeEnum.PROFESSOR
            }
        ];
    }

    protected newUser() {
        this.dialogService.open(UserFormDialog, {
            header: 'Incluir novo Usuário',
            focusOnShow: false,
            closable: true,
            closeOnEscape: true,
            modal: true,
            width: '400px',
            height: 'auto'
        })
    }

    protected edit(user : User){
        this.dialogService.open(UserFormDialog, {
            header: 'Editar Usuario',
            focusOnShow: false,
            closable: true,
            closeOnEscape: true,
            modal: true,
            width: '400px',
            height: 'auto',
            data: {
                user: user
            }
        })
    }

    protected delete(user: User): void {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o usuário ${user.name}?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonProps: {
                severity: 'danger'
            },
            rejectButtonProps: {
                severity: 'secondary'
            },
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.toastService.success('Usuário excluído com sucesso!')
            }
        });
    }
}
