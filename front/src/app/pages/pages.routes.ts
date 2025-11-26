import { Routes } from '@angular/router';
import { Resources } from '@/pages/resources/resources';
import { Projects } from '@/pages/projects/projects';
import { Meetings } from '@/pages/meetings/meetings';
import { ProjectConsult } from '@/pages/projects/project-consult/project-consult';
import { Users } from '@/pages/users/users';
import {Professors} from "@/pages/professors/professors";
import {ProfessorConsult} from "@/pages/professors/professor-consult/professor-consult";

export default [
    { path: 'resources', component: Resources },
    { path: 'projects', component: Projects },
    { path: 'projects/:id', component: ProjectConsult },
    { path: 'meetings', component: Meetings },
    { path: 'users', component: Users },
    { path: 'professors', component: Professors },
    { path: 'professors/:id', component: ProfessorConsult },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
