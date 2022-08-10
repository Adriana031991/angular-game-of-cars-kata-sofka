
import { Component, OnDestroy, OnInit } from '@angular/core';

import { filter, map, Subject, takeUntil } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public breadcrumb: string = '';
  breadcrumb$ = new Subject<void>();

  constructor(
    private gameService: GameService,
    private router: Router
  ) {
    this.getRouteToBreadcrumb();
  }
  ngOnDestroy(): void {
    this.breadcrumb$.next();
    this.breadcrumb$.complete();
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
        this.breadcrumb = breadcrumb;
        console.log(this.breadcrumb);
        this.gameService.sharedMenuGame(breadcrumb);
      });
  }

  ngOnInit(): void { }


}
