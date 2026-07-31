import { Component, AfterViewInit, ElementRef, OnDestroy, ViewChild, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { NotificationService } from '../../shared/services/notification.service';
import { PROFILE } from '../../shared/constants/mock-data';
import { ContactService } from '../../shared/services/contact.service';
import { ContactRequest } from '../../shared/models/contact.model';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, TextareaModule, ButtonModule, CardModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],

})
export class ContactComponent implements AfterViewInit, OnDestroy {
  profile = PROFILE;
  form: FormGroup;
  inView: WritableSignal<boolean> = signal(false);
  isLoading = signal(false);
  @ViewChild('contactSection', { static: true }) contactSection!: ElementRef<HTMLElement>;
  private observer?: IntersectionObserver;
  constructor(private notify: NotificationService, private fb: FormBuilder, private contactService: ContactService) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      message: ['', [Validators.required, Validators.maxLength(2000)]],
    });
  }
  ngAfterViewInit(): void {
    // Animate once when section comes into view
    this.observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          this.inView.set(true);
          this.observer?.disconnect();
          break;
        }
      }
    }, { threshold: 0.12 });
    if (this.contactSection && this.contactSection.nativeElement) {
      this.observer.observe(this.contactSection.nativeElement);
    }
  }

  send() {
    if (this.isLoading()) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notify.warning('Validation Error', 'Please complete all required fields before submitting.', 3000);
      return;
    }

    const payload = this.form.value as ContactRequest;
    this.isLoading.set(true);

    this.contactService.sendMessage(payload).subscribe({
      next: () => {
        this.notify.success('Message Sent', "Thank you for reaching out! Your message has been sent successfully. I'll get back to you as soon as possible.", 4000);
        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.isLoading.set(false);
      },
      error: (err) => {
        if (!environment.production) console.error('Contact send error', err);
        // Network error (server not reachable)
        if (err && err.status === 0) {
          this.notify.error('Connection Error', 'Unable to connect to the server. Please check your internet connection and try again.', 5000);
        } else {
          // API error (4xx/5xx)
          this.notify.error('Submission Failed', 'Unable to send your message. Please try again later.', 5000);
        }
        // keep form data intact
        this.isLoading.set(false);
      },
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
