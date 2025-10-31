import { Routes } from '@angular/router';
import { Resources } from '@/pages/resources/resources';

export default [
    { path: 'resources', component: Resources},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
