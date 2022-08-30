import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { PodiumComponent } from './podium/podium.component';
import { RaceDialogComponent } from './race-dialog/race-dialog.component';
import { UiModule } from 'src/app/common/ui.module';



@NgModule({
  declarations: [
    GameComponent,
    PodiumComponent,
    RaceDialogComponent,
  ],
  imports: [
    CommonModule,
    UiModule,

  ]
})
export class GameModule { }
