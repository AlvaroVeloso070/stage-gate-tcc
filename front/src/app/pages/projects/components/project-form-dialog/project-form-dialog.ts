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
import {CoordinationService} from "@/services/coordination.service";

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

    private readonly coordinationService : CoordinationService = inject(CoordinationService);
    private readonly projectService : ProjectService = inject(ProjectService);
    private readonly dialogRef : DynamicDialogRef = inject(DynamicDialogRef);
    private readonly toastService : ToastService = inject(ToastService);

    protected users : User[] = [];

    // @ts-ignore
    protected project : Project = {}

    ngOnInit(): void {
        this.coordinationService.getUsersByType(UserTypeEnum.STUDENT).subscribe((response) => {
            this.users = response;
        })
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
