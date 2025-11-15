import { Component, inject, OnInit } from '@angular/core';
import {RouterModule} from '@angular/router';
import {BlockUI} from "primeng/blockui";
import {ProgressSpinner} from "primeng/progressspinner";
import {LoaderService} from "@/services/loader.service";
import { Toast } from 'primeng/toast';
import { PrimeNG } from 'primeng/config';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, BlockUI, ProgressSpinner, Toast],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
    protected loader: LoaderService = inject(LoaderService);
    private primeng : PrimeNG = inject(PrimeNG);

    ngOnInit(): void {
        this.primeng.setTranslation({
            firstDayOfWeek: 0, // Domingo como primeiro dia da semana
            dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
            dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
            dayNamesMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sá"],
            monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            today: 'Hoje',
            clear: 'Limpar'
        });
    }
}
