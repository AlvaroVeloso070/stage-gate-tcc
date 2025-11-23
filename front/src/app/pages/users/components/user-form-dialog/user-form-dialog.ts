import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {InputText} from "primeng/inputtext";
import {UserTypeEnum} from "@/pages/projects/entities/project";
import {Select} from "primeng/select";
import {Button} from "primeng/button";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {User} from "@/pages/users/entities/user";
import {FormsModule} from "@angular/forms";
import {ToastService} from "@/services/toast.service";

@Component({
  selector: 'app-user-form-dialog',
    imports: [
        InputText,
        Select,
        Button,
        FormsModule
    ],
  templateUrl: './user-form-dialog.html',
  styleUrl: './user-form-dialog.scss'
})
export class UserFormDialog implements OnInit{

    private readonly dialogRef : DynamicDialogRef = inject(DynamicDialogRef);
    private readonly dialogConfig : DynamicDialogConfig = inject(DynamicDialogConfig);
    private readonly toastService : ToastService = inject(ToastService);

    protected isEditing : WritableSignal<boolean> = signal(false);
    protected user !: User;

    protected userTypeOptions = [
        { label: 'Estudante', value: UserTypeEnum.STUDENT },
        { label: 'Professor', value: UserTypeEnum.PROFESSOR },
        { label: 'Coordenador', value: UserTypeEnum.COORDINATOR }
    ];

    // TODO utilizar formgroup
    ngOnInit(): void {
        let user : User = this.dialogConfig?.data?.user;
        if (user?.id){
            this.isEditing.set(true);
            this.user = user;
        }else {
            // @ts-ignore
            this.user = [];
        }
    }

    protected close(){
        this.dialogRef.close();
    }

    protected save() {
        this.toastService.success(`Usuário ${this.isEditing() ? 'alterado' : 'incluido'} com sucesso!`);
        this.dialogRef.close();
    }


}
