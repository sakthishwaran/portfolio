import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  standalone: true,
  selector: 'app-theme-toggle',
  imports: [CommonModule],
  template: `
    <button
      type="button"
      (click)="toggle()"
      aria-label="Toggle dark mode"
      class="glass-btn focus:outline-none focus:ring-4 focus:ring-(--color-accent)/20"
      [attr.aria-pressed]="theme.theme === 'dark'"
    >
      <span
        class="transition-transform duration-300"
        [class.rotate-180]="theme.theme === 'dark'"
        aria-hidden="true"
      >
        @if (theme.theme !== 'dark') {
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-(--color-accent)" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM15.071 4.929a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM18 10a1 1 0 110 2h-1a1 1 0 110-2h1zM15.071 15.071a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 111.414-1.414l.707.707zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.929 15.071a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM3 10a1 1 0 110 2H2a1 1 0 110-2h1zM4.93 4.929a1 1 0 011.414-1.414l.707.707A1 1 0 115.636 5.636l-.707-.707z" />
          </svg>
        }
        @if (theme.theme === 'dark') {
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-(--color-accent)" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 116.707 2.707a7 7 0 1010.586 10.586z" />
          </svg>
        }
      </span>
    </button>
  `,
})
export class ThemeToggleComponent {
  @HostBinding('class') hostClass = '';
  constructor(public theme: ThemeService) {}
  toggle() {
    // animate briefly by toggling class (CSS handles rotation)
    this.theme.toggle();
  }
}
