import { Routes } from '@angular/router';
import { Resources } from '@/pages/resources/resources';
import { Projects } from '@/pages/projects/projects';
import { Meetings } from '@/pages/meetings/meetings';
import { ProjectConsult } from '@/pages/projects/project-consult/project-consult';
import { Users } from '@/pages/users/users';
import { Professors } from '@/pages/professors/professors';

export default [
    { path: 'resources', component: Resources },
    { path: 'projects', component: Projects },
    { path: 'projects/:id', component: ProjectConsult },
    { path: 'meetings', component: Meetings },
    { path: 'users', component: Users },
    { path: 'professors', component: Professors },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
