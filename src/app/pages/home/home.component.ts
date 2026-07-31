import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { PROFILE } from '../../shared/constants/mock-data';
import { NavbarComponent } from '../../layout/navbar.component';
import { FooterComponent } from '../../layout/footer.component';
import { ProjectCardComponent } from '../../shared/components/project-card.component';
import { InViewportDirective } from '../../shared/directives/in-viewport.directive';
import { SkillBarComponent } from '../../shared/components/skill-bar.component';
import { HeroImageComponent } from '../../shared/components/hero-image.component';
import { TypingComponent } from '../../shared/components/typing.component';
import { CtaButtonsComponent } from '../../shared/components/cta-buttons.component';
import { SocialLinksComponent } from '../../shared/components/social-links.component';
import { ScrollSpyService } from '../../shared/services/scroll-spy.service';
import { AboutComponent } from "../about/about.component";
import { SkillsComponent } from "../skills/skills.component";
import { ContactComponent } from "../contact/contact.component";

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, ButtonModule, InputTextModule, TextareaModule, NavbarComponent, FooterComponent, ProjectCardComponent, InViewportDirective, SkillBarComponent, HeroImageComponent, TypingComponent, CtaButtonsComponent, SocialLinksComponent, AboutComponent, SkillsComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  profile = PROFILE;
  typingPhrases = [
    `I build <span style="color:var(--color-accent);font-weight:600">scalable</span> web applications`,
    'Full Stack Developer',
    'Angular Developer',
    'Node.js Developer',
  ];
  @ViewChildren('sectionRef', { read: ElementRef }) sections!: QueryList<ElementRef>;
  constructor(private spy: ScrollSpyService) {}

  ngAfterViewInit(): void {
    // register sections with scroll spy
    setTimeout(() => {
      const ids = ['home', 'about', 'skills', 'projects', 'contact'];
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) this.spy.register(id, el);
      });
    }, 200);
  }

  navigateTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
