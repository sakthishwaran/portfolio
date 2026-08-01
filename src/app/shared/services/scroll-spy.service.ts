import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private sections = new Map<string, Element>();
  active = signal<string | null>(null);
  private observer?: IntersectionObserver;

  register(id: string, el: Element) {
    this.sections.set(id, el);
    this.ensureObserver();
    this.observer!.observe(el);
  }

  unregister(id: string) {
    const el = this.sections.get(id);
    if (el && this.observer) {
      this.observer.unobserve(el);
    }
    this.sections.delete(id);
  }

  private ensureObserver() {
    if (this.observer) return;
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -40% 0px',
      threshold: [0.2, 0.6],
    };
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = (e.target as Element).id || null;
          if (id) this.active.set(id);
        }
      });
    }, options);
  }
}
