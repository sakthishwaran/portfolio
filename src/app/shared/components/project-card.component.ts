import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Project } from '../../shared/models/profile.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  @Input() project!: Project;
  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = '/images/placeholder.svg';
  }
}
