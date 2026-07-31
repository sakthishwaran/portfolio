import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../services/theme.service';

@Component({
  standalone: true,
  selector: 'app-theme-toggle',
  imports: [CommonModule],
  template: `
    <button
      type="button"
      (click)="toggle()"
      aria-label="Toggle theme"
      class="relative inline-flex h-9 w-[72px] shrink-0 cursor-pointer items-center rounded-full bg-[rgba(239,35,60,0.07)] p-1 ring-1 ring-[rgba(239,35,60,0.18)] transition-all duration-300 hover:ring-[rgba(239,35,60,0.35)]"
    >
      <!-- Sun (left) -->
      <span
        class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300"
        [ngClass]="theme.theme !== 'dark' ? 'bg-white shadow text-amber-500' : 'text-gray-400'"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      </span>
      <!-- Moon (right) -->
      <span
        class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300"
        [ngClass]="theme.theme === 'dark' ? 'bg-white shadow text-slate-700' : 'text-gray-400'"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </span>
    </button>
  `,

})
export class ThemeToggleComponent {
  constructor(public theme: ThemeService) {}
  toggle() {
    this.theme.toggle();
  }
}
