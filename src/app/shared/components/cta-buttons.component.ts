import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta-buttons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <a [href]="resumeUrl || '#'"
         class="inline-flex items-center gap-2 rounded-xl bg-[var(--color-danger)] px-7 py-3.5 font-semibold !text-white shadow-[0_8px_24px_rgba(217,4,41,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(217,4,41,0.38)]"
         download aria-label="Download CV">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download CV
      </a>
      <button
        class="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--color-danger)] px-7 py-3.5 font-semibold text-[var(--color-danger)] transition-all duration-300 hover:bg-[var(--color-danger)] hover:text-white"
        (click)="viewProjects.emit()" aria-label="View projects">
        View Projects
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
        </svg>
      </button>
    </div>
  `,
  styles: []
})
export class CtaButtonsComponent {
  @Input() resumeUrl?: string;
  @Output() viewProjects = new EventEmitter<void>();
}
