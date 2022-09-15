import { Component, OnInit } from '@angular/core';
import { LayoutFacadeService } from '../../services/layout-facade.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{

  dataMenuGame$ = this.layoutService.dataMenuGame$;

  constructor(

    private layoutService: LayoutFacadeService) {
  }

  ngOnInit() {
    this.layoutService.dataMenuGame$

  }

  toggle() {
    this.layoutService.toggle();
  }





}
