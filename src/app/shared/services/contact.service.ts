import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactRequest, ContactResponse } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private base = environment.apiUrl;
  constructor(private http: HttpClient) {}

  sendMessage(payload: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.base}/contact`, payload);
  }
}
