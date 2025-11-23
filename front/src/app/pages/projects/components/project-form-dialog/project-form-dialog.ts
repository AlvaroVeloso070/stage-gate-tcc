import {Component, inject, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {UserService} from "@/services/user.service";
import {User} from "@/pages/users/entities/user";
import {Project, UserTypeEnum} from "@/pages/projects/entities/project";
import {MultiSelect} from "primeng/multiselect";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ProjectService} from "@/services/project.service";
import {ToastService} from "@/services/toast.service";

@Component({
  selector: 'app-project-form-dialog',
    imports: [
        Button,
        FormsModule,
        InputText,
        MultiSelect
    ],
  templateUrl: './project-form-dialog.html',
  styleUrl: './project-form-dialog.scss'
})
export class ProjectFormDialog implements OnInit{

    private readonly userService : UserService = inject(UserService);
    private readonly projectService : ProjectService = inject(ProjectService);
    private readonly dialogRef : DynamicDialogRef = inject(DynamicDialogRef);
    private readonly toastService : ToastService = inject(ToastService);

    protected users : User[] = [];

    // @ts-ignore
    protected project : Project = {}

    //TODO implementar endpoint para retornar somente nome e id dos estudantes para o campo select
    ngOnInit(): void {
        // this.userService.getAllUsers().subscribe((response) => {
        //     this.users = response.filter(user => user.type === UserTypeEnum.STUDENT);
        // })

        this.users = [
            {
                id: '1',
                name: 'Ana Carolina Pereira',
                email: 'ana.pereira@student.edu',
                type: UserTypeEnum.STUDENT
            },
            {
                id: '4',
                name: 'Pedro Henrique Costa',
                email: 'pedro.costa@student.edu',
                type: UserTypeEnum.STUDENT
            },
            {
                id: '6',
                name: 'João Silva Santos',
                email: 'joao.santos@student.edu',
                type: UserTypeEnum.STUDENT
            },
            {
                id: '9',
                name: 'Beatriz Almeida Silva',
                email: 'beatriz.almeida@student.edu',
                type: UserTypeEnum.STUDENT
            },
            {
                id: '11',
                name: 'Mariana Oliveira Rodrigues',
                email: 'mariana.rodrigues@student.edu',
                type: UserTypeEnum.STUDENT
            }
        ];
    }

    protected save() {
        this.projectService.createProject(this.project).subscribe((createdProject) => {
            this.toastService.success('Projeto criado com sucesso!');
            this.dialogRef.close(createdProject);
        });
    }

    protected close(){
        this.dialogRef.close();
    }
}
