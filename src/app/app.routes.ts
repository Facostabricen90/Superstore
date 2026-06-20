import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/orders-list/orders-list').then(m => m.OrdersList),
  },
  {
    path: 'orders/nueva',
    loadComponent: () =>
      import('./pages/order-form/order-form').then(m => m.OrderForm),
  },
  {
    path: 'people',
    loadComponent: () =>
      import('./pages/people-list/people-list').then(m => m.PeopleList),
  },
  {
    path: 'people/nuevo',
    loadComponent: () =>
      import('./pages/person-form/person-form').then(m => m.PersonForm),
  },
  {
    path: 'returns',
    loadComponent: () =>
      import('./pages/returns-list/returns-list').then(m => m.ReturnsList),
  },
  {
    path: 'returns/nuevo',
    loadComponent: () =>
      import('./pages/return-form/return-form').then(m => m.ReturnForm),
  },
];
