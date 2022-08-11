import { Injectable, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { NbDialogService, NbSidebarService } from '@nebular/theme';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { RaceDialogComponent } from '../game/race-dialog/race-dialog.component';
import { SharedService } from '../../services/shared.service';

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

  modalDialog() {
    this.dialogService.open(RaceDialogComponent, {
      context: {
        title: 'The race has finished',
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
