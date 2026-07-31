import { Component, AfterViewInit, ElementRef, NgZone, OnDestroy, ViewChild, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { PROFILE } from '../../shared/constants/mock-data';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, InputTextModule, TextareaModule, ButtonModule, ToastModule, CardModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MessageService],
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  profile = PROFILE;
  name = '';
  email = '';
  subject = '';
  message = '';
  inView: WritableSignal<boolean> = signal(false);
  @ViewChild('contactSection', { static: true }) contactSection!: ElementRef<HTMLElement>;
  private observer?: IntersectionObserver;
  constructor(private msg: MessageService, private ngZone: NgZone) {}
  ngAfterViewInit(): void {
    // Animate once when section comes into view
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            this.ngZone.run(() => this.inView.set(true));
            this.observer?.disconnect();
            break;
          }
        }
      }, { threshold: 0.12 });
      if (this.contactSection && this.contactSection.nativeElement) {
        this.observer.observe(this.contactSection.nativeElement);
      }
    });
  }

  send() {
    // mock send
    this.msg.add({ severity: 'success', summary: 'Message sent', detail: 'I will get back to you shortly.' });
    this.name = this.email = this.subject = this.message = '';
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
