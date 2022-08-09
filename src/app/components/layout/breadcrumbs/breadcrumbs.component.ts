import { Component } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';

import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {

  constructor(private facade: FacadeService,
    private iconLibraries: NbIconLibraries) {

      this.iconLibraries.registerFontPack('fa', { iconClassPrefix: 'fa' });

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
