import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    templateUrl: './app.menu.html',
})
export class AppMenu implements OnInit{
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
                    {label: 'Projetos', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages/projects']},
                    {label: 'Reuniões', icon: 'pi pi-fw pi-video', routerLink: ['/pages/meetings']},
                    {label: 'Recursos', icon: 'pi pi-fw pi-book', routerLink: ['/pages/resources']},
                    {label: 'Professores', icon: 'pi pi-fw pi-graduation-cap', routerLink: ['/pages/professors']}
                ]
            },
            {
                label: 'Administração',
                items: [
                    {label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/pages/users']},
                    {label: 'Configurações', icon: 'pi pi-fw pi-cog', routerLink: ['/pages/settings']}
                ]
            }
        ];
    }
}
