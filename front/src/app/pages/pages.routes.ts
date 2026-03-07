import {Routes} from '@angular/router';
import {Resources} from '@/pages/resources/resources';
import {Projects} from '@/pages/projects/projects';
import {Meetings} from '@/pages/meetings/meetings';
import {ProjectConsult} from '@/pages/projects/project-consult/project-consult';
import {Users} from '@/pages/users/users';
import {Professors} from '@/pages/professors/professors';
import {Settings} from "@/pages/settings/settings";

export default [
    { path: 'resources', component: Resources },
    { path: 'projects', component: Projects },
    { path: 'projects/:id', component: ProjectConsult },
    { path: 'meetings', component: Meetings },
    { path: 'users', component: Users },
    { path: 'professors', component: Professors },
    { path: 'settings', component: Settings },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
