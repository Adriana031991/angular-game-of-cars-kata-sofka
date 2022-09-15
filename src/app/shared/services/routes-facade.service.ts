import { ChangeDetectorRef, Component, Injectable, OnDestroy, Optional, TemplateRef, Type } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { NbComponentStatus, NbDialogRef, NbDialogService, NbGlobalLogicalPosition, NbGlobalPosition, NbSidebarService, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { RaceDialogComponent } from '../../feature3-game/components/race-dialog/race-dialog.component';
import { SharedService } from './shared.service';
import { Driver } from 'src/app/shared/models/player-interfaces';
import { CallToBackendService } from 'src/app/shared/services/call-to-backend.service';

@Injectable({
  providedIn: 'root'
})
export class RoutesFacadeService implements OnDestroy {

  breadcrumb$ = new Subject<void>();
  destroyCallToServer$ = new Subject<void>();

  constructor(
    private sharedService: SharedService,
    private router: Router,) {
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
    this.router.navigate(['/layout/game/new-game'])
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
        this.sharedService.sharedMenuGame(breadcrumb);
      });
  }

 
  


}
