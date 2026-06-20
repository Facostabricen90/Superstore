import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SuperstoreApiService } from '../../core/services/superstore-api';

@Component({
  selector: 'app-person-form',
  imports: [ReactiveFormsModule],
  templateUrl: './person-form.html',
  styleUrl: './person-form.scss',
})
export class PersonForm {
  private api = inject(SuperstoreApiService);
  private router = inject(Router);

  enviando = signal(false);
  regions = ['East', 'West', 'Central', 'South'];

  form = new FormGroup({
    regionalManager: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    try {
      await this.api.addPersonFetch({
        regionalManager: this.form.value.regionalManager ?? '',
        region: this.form.value.region ?? '',
      });
      alert('✅ Regional manager agregado exitosamente');
      this.router.navigate(['/people']);
    } catch (err) {
      console.error(err);
      alert('❌ Error al agregar el manager. Intenta de nuevo.');
    } finally {
      this.enviando.set(false);
    }
  }

  cancelar() {
    this.router.navigate(['/people']);
  }
}
