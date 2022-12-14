import { Component } from '@angular/core';

import { MENU_ITEMS } from './menu-service-items';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <app-layout>
    <nb-menu [items]="menuItems" ></nb-menu>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class PagesComponent {

  menuItems = MENU_ITEMS;


}
