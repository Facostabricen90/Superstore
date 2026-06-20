import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-item.html',
  styleUrl: './nav-item.scss',
})
export class NavItem {
  to = input.required<string>();
  icon = input<string>('');
  label = input.required<string>();
  color = input<string>('');
  colorText = input<string>('');
  isPrimary = input<boolean>(false);
  exact = input<boolean>(false);
}
