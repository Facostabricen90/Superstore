import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Orders, People, Returns } from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class SuperstoreApiService {
  private readonly http = inject(HttpClient);
  private readonly API_URL =
    'https://script.google.com/a/macros/ucaldas.edu.co/s/AKfycbzv92n5LA3PqzWBEbT5hjaIVuISFlov8GDnVV1tUcQaHtGiVpbbjOQD-PZFzb2WAZ0__Q/exec';

  getData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API_URL);
  }

  addOrder(payload: Omit<Orders, 'rowId'>): Observable<any> {
    return this.http.post(
      this.API_URL,
      JSON.stringify({ action: 'addOrder', ...payload }),
      { headers: { 'Content-Type': 'text/plain' } }
    );
  }

  addPerson(payload: People): Observable<any> {
    return this.http.post(
      this.API_URL,
      JSON.stringify({ action: 'addPerson', ...payload }),
      { headers: { 'Content-Type': 'text/plain' } }
    );
  }

  addReturn(payload: Returns): Observable<any> {
    return this.http.post(
      this.API_URL,
      JSON.stringify({ action: 'addReturn', ...payload }),
      { headers: { 'Content-Type': 'text/plain' } }
    );
  }

  // Fallback con fetch nativo (mode: no-cors) para evitar CORS con Google Apps Script
  async addOrderFetch(payload: Omit<Orders, 'rowId'>): Promise<void> {
    await fetch(this.API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'addOrder', ...payload }),
    });
  }

  async addPersonFetch(payload: People): Promise<void> {
    await fetch(this.API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'addPerson', ...payload }),
    });
  }

  async addReturnFetch(payload: Returns): Promise<void> {
    await fetch(this.API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'addReturn', ...payload }),
    });
  }
}
