import { Component } from '@angular/core';
import { FacadeService } from 'src/app/pages/services/facade.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  dataMenuGame$ = this.gameService.dataMenuGame$;

  constructor(
    private facadeService: FacadeService,
    private gameService: SharedService) {
  }

  toggle() {
    this.facadeService.toggle();
  }




}
