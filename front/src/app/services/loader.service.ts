import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
    loading = signal(false);
    private timer?: ReturnType<typeof setTimeout>;

    show(delayMs = 2000) {
        this.clearTimer();
        this.timer = setTimeout(() => this.loading.set(true), delayMs);
    }

    hide() {
        this.clearTimer();
        this.loading.set(false);
    }

    private clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
    }
}
