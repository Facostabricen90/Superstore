import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SuperstoreApiService } from '../../core/services/superstore-api';

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.scss',
})
export class OrderForm implements OnInit {
  private api = inject(SuperstoreApiService);
  private router = inject(Router);

  enviando = signal(false);
  availableSubCategories = signal<string[]>([]);

  shipModes = ['Standard Class', 'Second Class', 'First Class', 'Same Day'];
  segments = ['Consumer', 'Corporate', 'Home Office'];
  regions = ['East', 'West', 'Central', 'South'];
  categories = ['Furniture', 'Office Supplies', 'Technology'];

  subCategoriesMap: Record<string, string[]> = {
    Furniture: ['Bookcases', 'Chairs', 'Furnishings', 'Tables'],
    'Office Supplies': [
      'Appliances', 'Art', 'Binders', 'Envelopes',
      'Fasteners', 'Labels', 'Paper', 'Storage', 'Supplies',
    ],
    Technology: ['Accessories', 'Copiers', 'Machines', 'Phones'],
  };

  form = new FormGroup({
    orderId:       new FormControl('', Validators.required),
    orderDate:     new FormControl('', Validators.required),
    shipDate:      new FormControl('', Validators.required),
    shipMode:      new FormControl('', Validators.required),
    customerId:    new FormControl('', Validators.required),
    customerName:  new FormControl('', Validators.required),
    segment:       new FormControl('', Validators.required),
    countryRegion: new FormControl('', Validators.required),
    city:          new FormControl('', Validators.required),
    stateProvince: new FormControl('', Validators.required),
    postalCode:    new FormControl(''),
    region:        new FormControl('', Validators.required),
    productId:     new FormControl('', Validators.required),
    productName:   new FormControl('', Validators.required),
    category:      new FormControl('', Validators.required),
    subCategory:   new FormControl('', Validators.required),
    sales:         new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    quantity:      new FormControl<number>(1, [Validators.required, Validators.min(1)]),
    discount:      new FormControl<number>(0, [Validators.min(0), Validators.max(1)]),
    profit:        new FormControl<number>(0, Validators.required),
  });

  ngOnInit() {
    this.form.get('category')?.valueChanges.subscribe((cat) => {
      this.availableSubCategories.set(this.subCategoriesMap[cat ?? ''] || []);
      this.form.get('subCategory')?.reset('');
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    alert('Enviando orden... espera un momento');

    try {
      const v = this.form.value;
      await this.api.addOrderFetch({
        orderId:       v.orderId ?? '',
        orderDate:     this.toDMY(v.orderDate),
        shipDate:      this.toDMY(v.shipDate),
        shipMode:      v.shipMode ?? '',
        customerId:    v.customerId ?? '',
        customerName:  v.customerName ?? '',
        segment:       v.segment ?? '',
        countryRegion: v.countryRegion ?? '',
        city:          v.city ?? '',
        stateProvince: v.stateProvince ?? '',
        postalCode:    v.postalCode ?? '',
        region:        v.region ?? '',
        productId:     v.productId ?? '',
        category:      v.category ?? '',
        subCategory:   v.subCategory ?? '',
        productName:   v.productName ?? '',
        sales:         Number(v.sales),
        quantity:      Number(v.quantity),
        discount:      Number(v.discount),
        profit:        Number(v.profit),
      });
      alert('✅ Orden registrada exitosamente');
      this.form.reset();
      this.availableSubCategories.set([]);
    } catch (err) {
      console.error(err);
      alert('❌ Error al registrar la orden. Intenta de nuevo.');
    } finally {
      this.enviando.set(false);
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  private toDMY(value: string | null | undefined): string {
    if (!value) return '';
    const [y, m, d] = value.split('-');
    if (!y || !m || !d) return value;
    return `${Number(d)}/${Number(m)}/${y}`;
  }
}
