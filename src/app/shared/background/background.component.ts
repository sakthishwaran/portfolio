import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('fxCanvas', { static: true }) fxCanvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D | null;
  private particles: Particle[] = [];
  private rafId = 0;
  private width = 0;
  private height = 0;

  // Mouse light target and current (interpolated)
  private mouse = { tx: -9999, ty: -9999, x: -9999, y: -9999 };

  private enabledInteraction = true;

  ngAfterViewInit(): void {
    // Respect reduced motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      this.enabledInteraction = false;
    }

    // Disable on touch devices
    if ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches) {
      this.enabledInteraction = false;
    }

    const canvas = this.fxCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.onResize();

    // initialize particles
    this.initParticles(70);

    if (this.enabledInteraction && this.ctx) {
      window.addEventListener('mousemove', this.onMouseMove);
    }

    window.addEventListener('resize', this.onResize);

    // start loop
    this.loop();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.onResize);
    if (this.enabledInteraction) {
      window.removeEventListener('mousemove', this.onMouseMove);
    }
  }

  // Keep handler as property so we can remove it
  private onMouseMove = (e: MouseEvent) => {
    this.mouse.tx = e.clientX;
    this.mouse.ty = e.clientY;
  };

  private onResize = () => {
    const canvas = this.fxCanvas?.nativeElement;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    this.width = canvas.clientWidth || window.innerWidth;
    this.height = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.max(1, Math.floor(this.width * ratio));
    canvas.height = Math.max(1, Math.floor(this.height * ratio));
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  private initParticles(count: number) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: 0.6 + Math.random() * 2.4,
        alpha: 0.04 + Math.random() * 0.08,
      });
    }
  }

  private loop = () => {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // interpolate mouse
    this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.12;
    this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.12;

    // clear with very low alpha to create subtle trailing
    ctx.clearRect(0, 0, w, h);

    // subtle aurora: thin horizontal gradient with blend
    const aurora = ctx.createLinearGradient(0, 0, w, h * 0.6);
    aurora.addColorStop(0, 'rgba(239,35,60,0.03)');
    aurora.addColorStop(0.5, 'rgba(141,153,174,0.02)');
    aurora.addColorStop(1, 'rgba(45,52,64,0.02)');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = aurora;
    ctx.fillRect(0, 0, w, h);

    // particles
    ctx.globalCompositeOperation = 'lighter';
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      // wrap
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
      g.addColorStop(0, `rgba(255,255,255,${p.alpha})`);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // mouse-follow radial light (desktop only)
    if (this.enabledInteraction && (this.mouse.x > -9000)) {
      const mx = this.mouse.x;
      const my = this.mouse.y;
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, Math.max(w, h) * 0.18);
      gradient.addColorStop(0, 'rgba(239,35,60,0.08)');
      gradient.addColorStop(0.4, 'rgba(239,35,60,0.03)');
      gradient.addColorStop(1, 'rgba(239,35,60,0)');
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    // thin animated gradient lines (light strokes)
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(239,35,60,0.04)';
    const t = performance.now() * 0.00005;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      const y = h * (i / 6) + Math.sin(t * (i + 1) * 4) * 18;
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(w * 0.25, y + 8, w * 0.75, y - 8, w, y);
      ctx.stroke();
    }

    // restore composite
    ctx.globalCompositeOperation = 'source-over';

    this.rafId = requestAnimationFrame(this.loop);
  };
}
