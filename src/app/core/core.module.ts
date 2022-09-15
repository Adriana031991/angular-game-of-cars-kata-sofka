import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './components/layout/layout.component';
import { UiModule } from 'src/app/shared/ui.module';
import { GameRoutingModule } from '../feature3-game/game-routing.module';


@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    UiModule,
    GameRoutingModule

  ],
  exports: [ LayoutComponent]
})
export class CoreModule {

}
