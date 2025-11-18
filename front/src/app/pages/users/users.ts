import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService, ConfirmationService } from 'primeng/api';

import { User, UserTypeEnum, CreateUserRequest, UpdateUserRequest } from '@/pages/users/entities/user';
import { UserService } from '@/services/user.service';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, Button, InputTextModule, SelectButtonModule, DialogModule, ToastModule, ConfirmDialogModule, TagModule, ToolbarModule, TooltipModule],
    providers: [MessageService, ConfirmationService],
    templateUrl: './users.html',
    styleUrls: ['./users.scss']
})
export class Users implements OnInit {
    users: User[] = [];
    filteredUsers: User[] = [];
    selectedUser: User | null = null;

    userDialog: boolean = false;
    isEditing: boolean = false;
    loading: boolean = false;

    userForm: CreateUserRequest | UpdateUserRequest = {
        name: '',
        email: '',
        type: UserTypeEnum.STUDENT
    };

    globalFilter: string = '';

    userTypeOptions = [
        { label: 'Estudante', value: UserTypeEnum.STUDENT },
        { label: 'Professor', value: UserTypeEnum.PROFESSOR },
        { label: 'Coordenador', value: UserTypeEnum.COORDINATOR }
    ];

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadMockUsers();
    }

    loadMockUsers(): void {
        this.loading = true;

        setTimeout(() => {
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

            this.filteredUsers = [...this.users];
            this.loading = false;
        }, 800);
    }

    loadUsers(): void {
        this.loading = true;
        this.userService.getAllUsers().subscribe({
            next: (users) => {
                this.users = users;
                this.filteredUsers = users;
                this.loading = false;
            },
            error: (error) => {
                console.error('Erro ao carregar usuários:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Não foi possível carregar os usuários'
                });
                this.loading = false;
            }
        });
    }

    openNew(): void {
        this.userForm = {
            name: '',
            email: '',
            type: UserTypeEnum.STUDENT
        };
        this.isEditing = false;
        this.userDialog = true;
    }

    editUser(user: User): void {
        this.userForm = {
            name: user.name,
            email: user.email,
            type: user.type
        };
        this.selectedUser = user;
        this.isEditing = true;
        this.userDialog = true;
    }

    deleteUser(user: User): void {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o usuário ${user.name}?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.users = this.users.filter((u) => u.id !== user.id);
                this.filteredUsers = [...this.users];

                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Usuário excluído com sucesso'
                });
            }
        });
    }

    saveUser(): void {
        if (this.validateForm()) {
            if (this.isEditing && this.selectedUser) {
                const index = this.users.findIndex((u) => u.id === this.selectedUser!.id);
                if (index !== -1) {
                    this.users[index] = {
                        ...this.selectedUser,
                        name: this.userForm.name,
                        email: this.userForm.email,
                        type: this.userForm.type
                    };
                    this.filteredUsers = [...this.users];
                }

                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Usuário atualizado com sucesso'
                });
            } else {
                const newUser: User = {
                    id: (this.users.length + 1).toString(),
                    name: this.userForm.name,
                    email: this.userForm.email,
                    type: this.userForm.type
                };

                this.users.push(newUser);
                this.filteredUsers = [...this.users];

                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Usuário criado com sucesso'
                });
            }

            this.userDialog = false;
        }
    }

    validateForm(): boolean {
        if (!this.userForm.name.trim()) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Atenção',
                detail: 'Nome é obrigatório'
            });
            return false;
        }

        if (!this.userForm.email.trim()) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Atenção',
                detail: 'Email é obrigatório'
            });
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(this.userForm.email)) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Atenção',
                detail: 'Email inválido'
            });
            return false;
        }

        return true;
    }

    hideDialog(): void {
        this.userDialog = false;
    }

    applyGlobalFilter(event: any): void {
        this.globalFilter = event.target.value;
    }

    getUserTypeSeverity(type: UserTypeEnum): string {
        switch (type) {
            case UserTypeEnum.COORDINATOR:
                return 'coordinator';
            case UserTypeEnum.PROFESSOR:
                return 'professor';
            case UserTypeEnum.STUDENT:
                return 'student';
            default:
                return 'info';
        }
    }

    getUserTypeLabel(type: UserTypeEnum): string {
        switch (type) {
            case UserTypeEnum.COORDINATOR:
                return 'Coordenador';
            case UserTypeEnum.PROFESSOR:
                return 'Professor';
            case UserTypeEnum.STUDENT:
                return 'Estudante';
            default:
                return type;
        }
    }
}
