import { Component, Input, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-image.component.html',
  styleUrls: [],
})
export class HeroImageComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) imageUrl!: string;
  @Input() altText = 'Portrait of Sakthishwaran A';
  @Input() showAnimation = true;

  visible = false;
  private observer?: IntersectionObserver;
  private hasAnimated = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    // If there's no image URL, do not render the reveal animation
    if (!this.imageUrl) return;

    if (!this.showAnimation) {
      this.visible = true;
      return;
    }

    const host = this.el.nativeElement as HTMLElement;
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.visible = true;
            this.hasAnimated = true;
          }
        });
      },
      { threshold: 0.25 }
    );

    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  onImgLoad(): void {
    this.visible = true;
  }

  onImgError(): void {
    // Keep visibility true to avoid showing raw alt text; allow parent to handle missing asset
    this.visible = true;
  }
}
