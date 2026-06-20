import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { SuperstoreApiService } from '../../core/services/superstore-api';
import { Orders } from '../../core/models/interfaces';

@Component({
  selector: 'app-orders-list',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.scss',
})
export class OrdersList implements OnInit {
  private api = inject(SuperstoreApiService);

  orders = signal<Orders[]>([]);
  cargando = signal(true);

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando.set(true);
    this.api.getData().subscribe({
      next: (data) => this.orders.set(data.orders || []),
      error: (err) => {
        console.error('Error al cargar datos:', err);
        this.cargando.set(false);
      },
      complete: () => this.cargando.set(false),
    });
  }

  get ordersReversed(): Orders[] {
    return this.orders().slice().reverse();
  }
}
