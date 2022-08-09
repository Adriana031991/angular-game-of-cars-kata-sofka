import { Component } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { Subject, takeUntil } from 'rxjs';

import { MENU_ITEMS } from './menu-service-items';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <app-layout>
    <nb-menu tag="menu" [items]="menuItems" ></nb-menu>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class PagesComponent {

  menuItems = MENU_ITEMS;

  private destroy$ = new Subject<void>();
  selectedItem: string = '';

  constructor(private menuService: NbMenuService) { }

  getSelectedItem() {
    this.menuService.getSelectedItem('menu')
      .pipe(takeUntil(this.destroy$))
      .subscribe( (menuBag) => {
        this.selectedItem = menuBag.item.title;
      });
  }
}
