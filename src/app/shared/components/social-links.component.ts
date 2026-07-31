import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-4 sm:gap-5">
      @if (github) {
        <a [href]="github" target="_blank" rel="noopener" aria-label="GitHub" class="flex h-14 w-14 items-center justify-center rounded-full bg-white text-(--color-primary) shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-(--color-danger) hover:text-white!">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.38-3.88-1.38-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.52.11-3.17 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 2.9-.39c.99 0 1.98.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.65.23 2.87.11 3.17.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.68.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"></path></svg>
        </a>
      }
      @if (linkedin) {
        <a [href]="linkedin" target="_blank" rel="noopener" aria-label="LinkedIn" class="flex h-14 w-14 items-center justify-center rounded-full bg-white text-(--color-primary) shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-(--color-danger) hover:text-white!">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zM8.5 8h3.8v2.2h.1c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.8V24h-4v-7.2c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8V24h-4V8z"></path></svg>
        </a>
      }
      @if (email) {
        <a [href]="'mailto:' + email" aria-label="Email" class="flex h-14 w-14 items-center justify-center rounded-full bg-white text-(--color-primary) shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-(--color-danger) hover:text-white!">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path></svg>
        </a>
      }
    </div>
  `,
  styles: []
})
export class SocialLinksComponent {
  @Input() github?: string;
  @Input() linkedin?: string;
  @Input() email?: string;
}
