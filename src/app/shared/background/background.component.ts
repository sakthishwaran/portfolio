import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('fxCanvas', { static: true })
  fxCanvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D | null;
  private rafId = 0;
  private width = 0;
  private height = 0;

  private mouse = {
    tx: -9999,
    ty: -9999,
    x: -9999,
    y: -9999
  };

  private enabledInteraction = true;

  ngAfterViewInit(): void {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      this.enabledInteraction = false;
    }

    if ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches) {
      this.enabledInteraction = false;
    }

    this.ctx = this.fxCanvas.nativeElement.getContext('2d');

    this.onResize();

    if (this.enabledInteraction) {
      window.addEventListener('mousemove', this.onMouseMove);
    }

    window.addEventListener('resize', this.onResize);

    this.loop();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);

    window.removeEventListener('resize', this.onResize);

    if (this.enabledInteraction) {
      window.removeEventListener('mousemove', this.onMouseMove);
    }
  }

  private onMouseMove = (e: MouseEvent) => {
    this.mouse.tx = e.clientX;
    this.mouse.ty = e.clientY;
  };

  private onResize = () => {
    const canvas = this.fxCanvas.nativeElement;
    const ratio = window.devicePixelRatio || 1;

    this.width = canvas.clientWidth || window.innerWidth;
    this.height = canvas.clientHeight || window.innerHeight;

    canvas.width = this.width * ratio;
    canvas.height = this.height * ratio;

    const ctx = canvas.getContext('2d');
    ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  private loop = () => {
    if (!this.ctx) return;

    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    // Mouse smoothing
    this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.12;
    this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.12;

    // Aurora gradient
    const aurora = ctx.createLinearGradient(0, 0, w, h);

    aurora.addColorStop(0, 'rgba(239,35,60,0.03)');
    aurora.addColorStop(0.5, 'rgba(141,153,174,0.02)');
    aurora.addColorStop(1, 'rgba(45,52,64,0.02)');

    ctx.fillStyle = aurora;
    ctx.fillRect(0, 0, w, h);

    // Mouse spotlight
    if (this.enabledInteraction && this.mouse.x > -9000) {
      const g = ctx.createRadialGradient(
        this.mouse.x,
        this.mouse.y,
        0,
        this.mouse.x,
        this.mouse.y,
        Math.max(w, h) * 0.2
      );

      g.addColorStop(0, 'rgba(239,35,60,0.08)');
      g.addColorStop(0.4, 'rgba(239,35,60,0.03)');
      g.addColorStop(1, 'rgba(239,35,60,0)');

      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    // Animated flowing lines
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = 1;

    const time = performance.now() * 0.00025;

    for (let i = 0; i < 8; i++) {
      const gradient = ctx.createLinearGradient(0, 0, w, 0);

      gradient.addColorStop(0, 'rgba(239,35,60,0)');
      gradient.addColorStop(0.5, 'rgba(239,35,60,0.10)');
      gradient.addColorStop(1, 'rgba(239,35,60,0)');

      ctx.strokeStyle = gradient;

      const y = h * ((i + 1) / 9);

      ctx.beginPath();

      ctx.moveTo(0, y);

      for (let x = 0; x <= w; x += 30) {
        const wave =
          Math.sin(x * 0.01 + time * (i + 1)) * 12 +
          Math.cos(x * 0.004 + time * 0.8) * 6;

        ctx.lineTo(x, y + wave);
      }

      ctx.stroke();
    }

    this.rafId = requestAnimationFrame(this.loop);
  };
}
