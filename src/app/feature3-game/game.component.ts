import { Component } from '@angular/core';

import { MENU_ITEMS } from './menu-service-items';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['game.component.scss'],
  template: `
    <app-layout>
    <nb-menu [items]="menuItems" ></nb-menu>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class GameComponent {

  menuItems = MENU_ITEMS;


}
