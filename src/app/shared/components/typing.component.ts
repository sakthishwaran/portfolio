import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-typing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="typed"><span [innerHTML]="safeText()"></span><span class="cursor" [class.hidden]="!cursor()">|</span></span>
  `,
  styles: [
    `.typed{white-space:nowrap;display:inline-block} .cursor{display:inline-block;opacity:1;transition:opacity .2s} .cursor.hidden{opacity:0}`
  ]
})
export class TypingComponent implements OnInit {
  @Input() phrases: string[] = [];
  @Input() typeSpeed = 60;
  @Input() deleteSpeed = 40;
  @Input() pause = 1200;
  text = signal('');
  safeText = signal<SafeHtml>('' as any);
  cursor = signal(true);
  private idx = 0;
  private char = 0;
  private deleting = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loop();
    setInterval(() => this.cursor.set(!this.cursor()), 500);
  }

  private loop() {
    const current = this.phrases[this.idx % this.phrases.length] || '';
    if (!this.deleting) {
      if (this.char <= current.length) {
        const slice = current.slice(0, this.char);
        this.text.set(slice);
        this.safeText.set(this.sanitizer.bypassSecurityTrustHtml(slice));
        this.char++;
        setTimeout(() => this.loop(), this.typeSpeed + Math.random() * 40);
        return;
      }
      // pause then delete
      setTimeout(() => {
        this.deleting = true;
        this.loop();
      }, this.pause);
      return;
    }
    // deleting
    if (this.char >= 0) {
      const slice = current.slice(0, this.char);
      this.text.set(slice);
      this.safeText.set(this.sanitizer.bypassSecurityTrustHtml(slice));
      this.char--;
      setTimeout(() => this.loop(), this.deleteSpeed + Math.random() * 30);
      return;
    }
    this.deleting = false;
    this.idx++;
    setTimeout(() => this.loop(), 200);
  }
}
