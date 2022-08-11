import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { UiModule } from '../common/ui.module';
import { PagesComponent } from './pages.component';
import { NbDialogModule, NbMenuModule } from '@nebular/theme';
import { ComponentsModule } from '../components/components.module';
import { PodiumComponent } from './podium/podium.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RaceDialogComponent } from './game/race-dialog/race-dialog.component';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';
import { ChooseTrackAndNumberOfPlayersComponent } from './game/choose-track-and-number-of-players/choose-track-and-number-of-players.component';
import { WriteThePlayersComponent } from './game/write-the-players/write-the-players.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    GameComponent,
    PodiumComponent,
    RaceDialogComponent,
    PathNotFoundComponent,
    ChooseTrackAndNumberOfPlayersComponent,
    WriteThePlayersComponent,
  ],

  imports: [
    CommonModule,
    PagesRoutingModule,
    UiModule,
    ComponentsModule,
    ReactiveFormsModule,
    NbDialogModule.forChild(),

  ],
})
export class PagesModule { }
