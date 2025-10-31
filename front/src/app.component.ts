import {Component, inject} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BlockUI} from "primeng/blockui";
import {ProgressSpinner} from "primeng/progressspinner";
import {LoaderService} from "@/services/loader.service";
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, BlockUI, ProgressSpinner, Toast],
    templateUrl: './app.component.html'
})
export class AppComponent {
    protected loader: LoaderService = inject(LoaderService);
}
