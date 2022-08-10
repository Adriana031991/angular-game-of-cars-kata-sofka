import { Component, OnDestroy } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { Subject, takeUntil } from 'rxjs';
import { GameService } from '../services/game.service';

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
export class PagesComponent implements OnDestroy{

  menuItems = MENU_ITEMS;

  private destroy$ = new Subject<void>();


  constructor(private menuService: NbMenuService, private gameService: GameService) {
    this.getSelectedItem();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSelectedItem() {
    this.menuService.getSelectedItem('menu')
      .pipe(takeUntil(this.destroy$))
      .subscribe( (menuBag) => {
        this.gameService.sharedMenuGame(menuBag.item.title);
      });
  }
}
