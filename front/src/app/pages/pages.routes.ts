import { Routes } from '@angular/router';
import { Resources } from '@/pages/resources/resources';
import { Projects } from '@/pages/projects/projects';

export default [
    { path: 'resources', component: Resources},
    { path: 'projects', component: Projects},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
