import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { SuperstoreApiService } from '../../core/services/superstore-api';
import { People } from '../../core/models/interfaces';

@Component({
  selector: 'app-people-list',
  imports: [RouterLink, NgClass],
  templateUrl: './people-list.html',
  styleUrl: './people-list.scss',
})
export class PeopleList implements OnInit {
  private api = inject(SuperstoreApiService);

  people = signal<People[]>([]);
  cargando = signal(true);

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando.set(true);
    this.api.getData().subscribe({
      next: (data) => this.people.set(data.people || []),
      error: (err) => {
        console.error('Error:', err);
        this.cargando.set(false);
      },
      complete: () => this.cargando.set(false),
    });
  }

  getRegionBadgeClass(region: string): string {
    switch (region) {
      case 'East':    return 'mint';
      case 'West':    return 'lavender';
      case 'Central': return 'lemon';
      case 'South':   return 'rose';
      default:        return 'mint';
    }
  }
}
