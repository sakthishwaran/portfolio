import { Component, AfterViewInit, ElementRef, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import type { Profile } from '../../shared/models/profile.model';
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
  profile: Profile = PROFILE;
  @ViewChild('aboutRoot', { static: true }) aboutRoot!: ElementRef<HTMLElement>;
  private observer?: IntersectionObserver;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.aboutRoot.nativeElement, 'in-view');
            if (this.observer) this.observer.disconnect();
          }
        });
      }, { threshold: 0.12 });
      this.observer.observe(this.aboutRoot.nativeElement);
    } else {
      this.renderer.addClass(this.aboutRoot.nativeElement, 'in-view');
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
