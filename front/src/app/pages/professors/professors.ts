import {Component, inject, OnInit} from '@angular/core';
import {CoordinationService} from "@/services/coordination.service";
import {User} from "@/pages/users/entities/user";
import {UserTypeEnum} from "@/pages/projects/entities/project";
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";
import {Tooltip} from "primeng/tooltip";
import {Router} from "@angular/router";

@Component({
  selector: 'app-professors',
    imports: [
        Button,
        TableModule,
        Tooltip
    ],
  templateUrl: './professors.html',
  styleUrl: './professors.scss'
})
export class Professors implements OnInit{
    private readonly coordinationService : CoordinationService = inject(CoordinationService);
    private readonly router : Router = inject(Router);

    protected professors : User[] = [];

    ngOnInit(): void {
        this.coordinationService.getUsersByType(UserTypeEnum.PROFESSOR).subscribe((response : User[]) => {
            this.professors = response;
        })
    }

    protected consutProfessor(professor: User) {
        this.router.navigate(['pages/professors', professor.id])
    }
}
