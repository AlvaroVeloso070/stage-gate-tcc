import { Routes } from '@angular/router';
import { Resources } from '@/pages/resources/resources';
import { Projects } from '@/pages/projects/projects';
import { Meetings } from '@/pages/meetings/meetings';

export default [
    { path: 'resources', component: Resources},
    { path: 'projects', component: Projects},
    { path: 'meetings', component: Meetings},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
