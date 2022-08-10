import { IBreadcrumb } from './../../../common/models/breadcrumb.interface';
import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';

import { NbIconLibraries } from '@nebular/theme';
import { gameService } from '../../../services/game.service';
import { distinctUntilChanged, filter, map, tap } from 'rxjs';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

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
    private iconLibraries: NbIconLibraries,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {

      // this.iconLibraries.registerFontPack('fa', { iconClassPrefix: 'fa' });

      // this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
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
  //   this.router.events.pipe(
  //     filter((event): event is NavigationEnd => event instanceof NavigationEnd),
  //     distinctUntilChanged(),
  // ).subscribe(() => {
  //     this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  // })

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

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    //If no routeConfig is avalailable we are on the root path
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path?.split('/').pop();
    const isDynamicRoute = lastRoutePart?.startsWith(':');
    if(isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart?.split(':')[1];
      path = path?.replace(lastRoutePart!, route.snapshot.params[paramName!]);
      label = route.snapshot.params[paramName!];
    }

    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadcrumb = {
        label: label,
        url: nextUrl,
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [ ...breadcrumbs, breadcrumb ] : [ ...breadcrumbs];
    if (route.firstChild) {
        //If we are not on our current path yet,
        //there will be more children to look after, to build our breadcumb
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

// ---fernando herrera




}
