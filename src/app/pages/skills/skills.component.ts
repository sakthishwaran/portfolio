import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillBarComponent, SkillItem } from '../../shared/components/skill-bar.component';
import { PROFILE } from '../../shared/constants/mock-data';
import { NavbarComponent } from '../../layout/navbar.component';
import { FooterComponent } from '../../layout/footer.component';

@Component({
  standalone: true,
  selector: 'app-skills',
  imports: [CommonModule, SkillBarComponent],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('skillsSection', { static: true }) skillsSection!: ElementRef<HTMLElement>;

  profile = PROFILE;

  // Visible flag to trigger animations once
  private animated = false;

  // Skills as a signal array of SkillItem
  skills = signal<SkillItem[]>(
    this.profile.skills.map((name, i) => {
      const mapping: Record<string, number> = {
        Angular: 50,
        'TypeScript': 56,
        JavaScript: 70,
        'Node.js': 45,
        'Hapi.js': 45,
        Laravel: 80,
        PHP: 80,
        PostgreSQL: 33,
        MySQL: 78,
        'Tailwind CSS': 63,
      };
      const percentage = mapping[name] ?? Math.max(60, 90 - i * 5);
      return {
        id: i + 1,
        name,
        icon: this.iconFor(name),
        percentage,
        animatedPercentage: signal(0) as WritableSignal<number>,
      } as SkillItem;
    })
  );

  private observer?: IntersectionObserver;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.animated) {
            this.animated = true;
            this.animateAll();
            if (this.observer) {
              this.observer.disconnect();
            }
            break;
          }
        }
      }, { threshold: 0.2 });
      if (this.skillsSection && this.skillsSection.nativeElement) {
        this.observer.observe(this.skillsSection.nativeElement);
      }
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private iconFor(name: string) {
    const map: Record<string, string> = {
      Angular: '🅰️',
      'TypeScript': '🟦',
      JavaScript: '🟨',
      'Node.js': '🟩',
      'Hapi.js': '🔧',
      Laravel: '🌿',
      PHP: '🐘',
      PostgreSQL: '🐘',
      MySQL: '🐬',
      'Tailwind CSS': '🌬️',
    };
    return map[name] ?? '💡';
  }

  private animateAll() {
    const duration = 1500;
    const start = performance.now();
    const items = this.skills();

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
      for (const s of items) {
        const value = Math.round(s.percentage * ease);
        s.animatedPercentage.set(value);
      }
      if (t < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}
