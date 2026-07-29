import { Component, signal, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ThemeToggleComponent } from '../shared/components/theme-toggle.component';
import { ScrollSpyService } from '../shared/services/scroll-spy.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonModule, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isOpen = signal(false);
  active = signal<string | null>(null);
  scrolled = signal(false);
  private sub?: Subscription;
  private onScrollListener = () => this.scrolled.set(window.scrollY > 20);
  constructor(private spy: ScrollSpyService) {}
  ngOnInit() {
    // subscribe to the scroll spy signal via polling - simple sync
    this.active.set(this.spy.active());
    // poll for changes (signals aren't Observable here), use interval via requestAnimationFrame
    const tick = () => {
      this.active.set(this.spy.active());
      this.subTick = requestAnimationFrame(tick);
    };
    this.subTick = requestAnimationFrame(tick);
    // attach scroll listener
    window.addEventListener('scroll', this.onScrollListener, { passive: true });
  }
  private subTick = 0;
  ngOnDestroy() {
    cancelAnimationFrame(this.subTick);
    window.removeEventListener('scroll', this.onScrollListener);
  }
  toggle() {
    this.isOpen.update(v => !v);
  }
  close() {
    this.isOpen.set(false);
  }
  navigateTo(id: string, ev?: Event) {
    ev?.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.close();
  }
}
