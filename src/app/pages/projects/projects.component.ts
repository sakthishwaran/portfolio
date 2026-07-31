import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar.component';
import { FooterComponent } from '../../layout/footer.component';
import { PROFILE } from '../../shared/constants/mock-data';
import { ProjectCardComponent } from '../../shared/components/project-card.component';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [CommonModule, NavbarComponent, FooterComponent, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  profile = PROFILE;
}
