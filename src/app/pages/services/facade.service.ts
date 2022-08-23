import { Component, Injectable, OnDestroy, TemplateRef, Type } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { NbDialogService, NbSidebarService } from '@nebular/theme';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { RaceDialogComponent } from '../game/race-dialog/race-dialog.component';
import { SharedService } from '../../services/shared.service';
import { Driver } from 'src/app/common/models/player-interfaces';

@Injectable({
  providedIn: 'root'
})
export class FacadeService implements OnDestroy {

  breadcrumb$ = new Subject<void>();

  constructor(
    private sidebarService: NbSidebarService,
    private dialogService: NbDialogService,
    private gameService: SharedService,
    private router: Router) {
    this.getRouteToBreadcrumb();
  }

  ngOnDestroy(): void {
    this.breadcrumb$.next();
    this.breadcrumb$.complete();
  }

  navigateToHome() {
    this.router.navigate(['/layout/home'])
  }

  navigateToNewGame() {
    this.router.navigate(['/layout/new-game'])
  }

  navigateToPodium() {
    this.router.navigate(['/layout/podium'])
  }
  navigateToRr() {
    this.router.navigate(['/layout/rr'])
  }


  getRouteToBreadcrumb() {
    this.router.events
      .pipe(
        takeUntil(this.breadcrumb$),
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild == null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe(({ breadcrumb }) => {
        this.gameService.sharedMenuGame(breadcrumb);
      });
  }

  modalDialog(
    message: string,
    component: Type<{ title: string }> | TemplateRef<{ title: any }>
  ) {

    this.dialogService.open(component, {
      context: {
        title: message,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }



}
