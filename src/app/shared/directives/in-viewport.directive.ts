import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[inViewport]'
})
export class InViewportDirective implements OnInit, OnDestroy {
  @Input('inViewport') options: { rootMargin?: string; threshold?: number | number[]; once?: boolean } | string | undefined;
  private observer?: IntersectionObserver;
  constructor(private el: ElementRef<HTMLElement>) {}
  ngOnInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.el.nativeElement.classList.add('in-view');
      return;
    }
    const opts = (typeof this.options === 'string' && this.options.trim() === '') ? undefined : this.options as { rootMargin?: string; threshold?: number | number[]; once?: boolean } | undefined;
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          this.el.nativeElement.classList.add('in-view');
          if (opts?.once ?? true) {
            this.observer?.unobserve(e.target);
          }
        }
      });
    }, { root: null, rootMargin: opts?.rootMargin ?? '0px', threshold: opts?.threshold ?? 0.2 });
    this.observer.observe(this.el.nativeElement);
  }
  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
