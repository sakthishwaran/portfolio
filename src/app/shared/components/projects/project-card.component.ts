import {
  Component,
  Input,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Project } from '../../models/profile.model';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, ButtonModule, SkeletonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements AfterViewInit, OnDestroy {
  @Input() project!: Project;
  @Input() index = 0; // used for stagger delay from parent

  imageLoaded = false;
  private observer?: IntersectionObserver;
  private reducedMotion = false;
  private isTouch = false;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || window.matchMedia('(pointer:coarse)').matches);

    // set CSS reveal delay per card (stagger)
    const delay = this.reducedMotion ? 0 : this.index * 80;
    this.renderer.setStyle(this.el.nativeElement, '--reveal-delay', `${delay}ms`);

    // IntersectionObserver to reveal only once
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.renderer.addClass(this.el.nativeElement, 'in-view');
              if (this.observer) this.observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      this.observer.observe(this.el.nativeElement);
    } else {
      // fallback: reveal immediately
      this.renderer.addClass(this.el.nativeElement, 'in-view');
    }
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }
  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = '/images/placeholder.svg';
  }

  onImgLoad() {
    this.imageLoaded = true;
    // ensure small delay so skeleton fades smoothly
    this.renderer.addClass(this.el.nativeElement, 'img-loaded');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.reducedMotion || this.isTouch) return;
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // set spotlight position variables
    this.renderer.setStyle(this.el.nativeElement, '--mx', `${x}px`);
    this.renderer.setStyle(this.el.nativeElement, '--my', `${y}px`);
    // increase spotlight opacity smoothly
    this.renderer.setStyle(this.el.nativeElement, '--spot-opacity', '0.35');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.reducedMotion || this.isTouch) return;
    this.renderer.setStyle(this.el.nativeElement, '--spot-opacity', '0');
  }
}
