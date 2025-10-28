import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Stage-Gate TCC by
        <a href="https://inf.ufg.br/" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">INF - Universidade Federal de Goiás</a>
    </div>`
})
export class AppFooter {}
