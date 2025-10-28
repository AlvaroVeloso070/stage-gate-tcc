import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {LoaderService} from "@/services/loader.service";
import {ToastService} from "@/services/toast.service";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const toast = inject(ToastService);
    const loader = inject(LoaderService);
    const token = localStorage.getItem('jwt');

    const cloned = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

    loader.show();

    return next(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
            switch (error.status) {
                case 0:
                    toast.error('Não foi possível conectar ao servidor.');
                    break;
                case 400:
                    toast.warn('Requisição inválida.');
                    break;
                case 401:
                    toast.error('Sessão expirada. Faça login novamente.');
                    localStorage.removeItem('jwt');
                    break;
                case 403:
                    toast.error('Você não tem permissão para realizar esta ação.');
                    break;
                case 404:
                    toast.warn('Recurso não encontrado.');
                    break;
                case 500:
                    toast.error('Erro interno no servidor.');
                    break;
                default:
                    toast.error(`Erro inesperado (${error.status}).`);
                    break;
            }
            return throwError(() => error);
        }),
        finalize(() => loader.hide())
    );
};
