import {Component, input, InputSignal, OnInit, signal} from '@angular/core';
import {Tag} from "primeng/tag";
import {UserTypeEnum} from "@/pages/projects/entities/project";

@Component({
  selector: 'tag-user-type',
    imports: [
        Tag
    ],
  templateUrl: './tag-user-type.html',
  styleUrl: './tag-user-type.scss'
})
export class TagUserType implements OnInit{
    public userType: InputSignal<UserTypeEnum> = input.required();
    protected tagValue = signal<string>('-');
    protected tagSeverity = signal<string>('primary');

    ngOnInit(): void {
        switch (this.userType()) {
            case UserTypeEnum.COORDINATOR:
                this.tagValue.set('Coordenador');
                this.tagSeverity.set('primary');
                break;
            case UserTypeEnum.PROFESSOR:
                this.tagValue.set('Professor');
                this.tagSeverity.set('info')
                break;
            case UserTypeEnum.STUDENT:
                this.tagValue.set('Estudante');
                this.tagSeverity.set('success')
        }
    }
}
