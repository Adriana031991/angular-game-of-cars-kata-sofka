import { IBreadcrumb } from './../../../common/models/breadcrumb.interface';
import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';

import { gameService } from '../../../services/game.service';
import { filter, map } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  public breadcrumbs: IBreadcrumb[] = [];
  public breadcrumb1: string = '';

  constructor(
    private gameService: gameService,
    private facade: FacadeService,

    private router: Router,
) {

      this.router.events.pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild == null ),
        map((event: ActivationEnd ) =>
           event.snapshot.data
        )
        ).subscribe(({breadcrumb}) => {
          this.breadcrumb1 = breadcrumb
          console.log(this.breadcrumb1)})
  }
  ngOnInit(): void {


  }

  navigateToHome() {
    this.facade.navigateToHome()
  }

  navigateToNewGame() {
    this.facade.navigateToNewGame()
  }

  navigateToPodium() {
    this.facade.navigateToPodium()
  }




}
