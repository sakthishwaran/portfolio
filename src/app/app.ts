import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ThemeService } from './shared/services/theme.service';
import { BackgroundComponent } from './shared/background/background.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ToastModule, BackgroundComponent],
  providers: [MessageService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
  constructor(theme: ThemeService) {
    theme.init();
  }
}
