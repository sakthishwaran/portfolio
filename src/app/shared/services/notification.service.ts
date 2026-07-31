import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private messageService: MessageService) {}

  success(summary: string, detail: string, life = 4000) {
    this.add({ severity: 'success', summary, detail, life });
  }

  error(summary: string, detail: string, life = 5000) {
    this.add({ severity: 'error', summary, detail, life });
  }

  warning(summary: string, detail: string, life = 3000) {
    this.add({ severity: 'warn', summary, detail, life });
  }

  info(summary: string, detail: string, life = 4000) {
    this.add({ severity: 'info', summary, detail, life });
  }

  private add(msg: any) {
    // ensure consistent shape
    this.messageService.add(msg);
  }
}
