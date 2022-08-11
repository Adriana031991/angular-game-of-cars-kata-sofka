import { Injectable, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService implements OnDestroy {

  breadcrumb$ = new Subject<void>();

  constructor(
    private gameService: GameService,
    private router: Router) {
    this.getRouteToBreadcrumb();
  }

  ngOnDestroy(): void {
    this.breadcrumb$.next();
    this.breadcrumb$.complete();
  }

  navigateToHome() {
    console.log('navega a home')
    this.router.navigate(['/layout/home'])
  }

  navigateToNewGame() {
    console.log('navega a new game')
    this.router.navigate(['/layout/new-game'])
  }

  navigateToPodium() {
    console.log('navega a podium')
    this.router.navigate(['/layout/podium'])
  }


  getRouteToBreadcrumb() {
    this.router.events
      .pipe(
        takeUntil(this.breadcrumb$),
        filter(
          (event): event is ActivationEnd => event instanceof ActivationEnd
        ),
        filter((event: ActivationEnd) => event.snapshot.firstChild == null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe(({ breadcrumb }) => {
        this.gameService.sharedMenuGame(breadcrumb);
      });
  }

}
