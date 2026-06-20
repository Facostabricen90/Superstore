import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavItem } from './shared/components/nav-item/nav-item';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NavItem],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
