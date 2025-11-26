import {Component, inject, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BlockUI} from "primeng/blockui";
import {ProgressSpinner} from "primeng/progressspinner";
import {LoaderService} from "@/services/loader.service";
import {Toast} from 'primeng/toast';
import {PrimeNG} from 'primeng/config';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, BlockUI, ProgressSpinner, Toast],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    protected loader: LoaderService = inject(LoaderService);
    private primeng: PrimeNG = inject(PrimeNG);

    ngOnInit(): void {
        this.primeng.setTranslation({
            firstDayOfWeek: 0,
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sá'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            today: 'Hoje',
            clear: 'Limpar',
            dateFormat: 'dd/mm/yy',
            startsWith: 'Começa com',
            contains: 'Contém',
            notContains: 'Não contém',
            endsWith: 'Termina com',
            equals: 'Igual a',
            notEquals: 'Diferente de',
            noFilter: 'Sem filtro',
            lt: 'Menor que',
            lte: 'Menor ou igual a',
            gt: 'Maior que',
            gte: 'Maior ou igual a',
            dateIs: 'É igual a',
            dateIsNot: 'É diferente de',
            dateBefore: 'Antes de',
            dateAfter: 'Depois de',
            apply: 'Aplicar',
            matchAll: 'Corresponder todos',
            matchAny: 'Corresponder qualquer',
            addRule: 'Adicionar Regra',
            removeRule: 'Remover Regra',
        });
    }
}
