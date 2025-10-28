import {inject, Injectable} from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {

    private messageService: MessageService = inject(MessageService);

    success(detail: string, summary = 'Sucesso') {
        this.messageService.add({ severity: 'success', summary, detail });
    }

    info(detail: string, summary = 'Info') {
        this.messageService.add({ severity: 'info', summary, detail });
    }

    warn(detail: string, summary = 'Aviso') {
        this.messageService.add({ severity: 'warn', summary, detail });
    }

    error(detail: string, summary = 'Erro') {
        this.messageService.add({ severity: 'error', summary, detail });
    }
}
