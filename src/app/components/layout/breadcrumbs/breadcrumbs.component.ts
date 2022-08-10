import { IBreadcrumb } from './../../../common/models/breadcrumb.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';

import { gameService } from '../../../services/game.service';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public breadcrumb: string = '';
  breadcrumb$ = new Subject<void>();

  constructor(
    private gameService: gameService,

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
      });
  }

  ngOnInit(): void { }


}
