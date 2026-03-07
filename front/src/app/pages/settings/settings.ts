import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {Button} from 'primeng/button';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {GateService} from '@/services/gate.service';
import {Gate} from '@/shared/dtos/gate';
import {ToastService} from '@/services/toast.service';
import {finalize, forkJoin} from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    TableModule,
    InputTextModule,
    ToggleSwitch,
    Button
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings implements OnInit {
  private readonly gateService = inject(GateService);
  private readonly toastService = inject(ToastService);

  protected gates: Gate[] = [];
  protected loading = false;
  protected saving = false;

  ngOnInit(): void {
    this.listGates();
  }

  private listGates() {
    this.loading = true;
    this.gateService.listGates()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.gates = response.data;
        },
        error: () => {
          this.toastService.error('Erro ao listar os gates');
        }
      });
  }

  protected saveGates() {
    this.saving = true;
    const updateRequests = this.gates.map(gate =>
      this.gateService.updateGate(gate.id, {
        name: gate.name,
        hasDeliverable: gate.hasDeliverable
      })
    );

    forkJoin(updateRequests)
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: () => {
          this.toastService.success('Gates atualizados com sucesso!');
          this.listGates();
        },
        error: () => {
          this.toastService.error('Ocorreu um erro ao salvar as alterações nos gates.');
        }
      });
  }
}
