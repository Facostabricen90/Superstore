import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SuperstoreApiService } from '../../core/services/superstore-api';
import { Returns } from '../../core/models/interfaces';

@Component({
  selector: 'app-returns-list',
  imports: [RouterLink],
  templateUrl: './returns-list.html',
  styleUrl: './returns-list.scss',
})
export class ReturnsList implements OnInit {
  private api = inject(SuperstoreApiService);

  returns = signal<Returns[]>([]);
  cargando = signal(true);

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando.set(true);
    this.api.getData().subscribe({
      next: (data) => this.returns.set(data.returns || []),
      error: (err) => {
        console.error('Error:', err);
        this.cargando.set(false);
      },
      complete: () => this.cargando.set(false),
    });
  }
}
