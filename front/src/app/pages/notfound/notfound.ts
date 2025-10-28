import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '../../layout/component/floating-configurator/app.floatingconfigurator';
import {AppLogo} from "@/layout/component/logo/app.logo";

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [RouterModule, ButtonModule, AppLogo],
    templateUrl: './notfound.html',
})
export class Notfound {}
