import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SuperstoreApiService } from '../../core/services/superstore-api';

@Component({
  selector: 'app-return-form',
  imports: [ReactiveFormsModule],
  templateUrl: './return-form.html',
  styleUrl: './return-form.scss',
})
export class ReturnForm {
  private api = inject(SuperstoreApiService);
  private router = inject(Router);

  enviando = signal(false);

  form = new FormGroup({
    orderId:  new FormControl('', Validators.required),
    returned: new FormControl('Yes', Validators.required),
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    try {
      await this.api.addReturnFetch({
        orderId:  this.form.value.orderId ?? '',
        returned: this.form.value.returned ?? 'Yes',
      });
      alert('✅ Devolución registrada exitosamente');
      this.router.navigate(['/returns']);
    } catch (err) {
      console.error(err);
      alert('❌ Error al registrar la devolución. Intenta de nuevo.');
    } finally {
      this.enviando.set(false);
    }
  }

  cancelar() {
    this.router.navigate(['/returns']);
  }
}
