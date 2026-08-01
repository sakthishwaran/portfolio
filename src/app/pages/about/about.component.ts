import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar.component';
import { FooterComponent } from '../../layout/footer.component';
import { PROFILE } from '../../shared/constants/mock-data';

@Component({
  standalone: true,
  selector: 'app-about',
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  profile = PROFILE;
}
