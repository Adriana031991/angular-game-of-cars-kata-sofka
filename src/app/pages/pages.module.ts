import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { UiModule } from '../common/ui.module';
import { PagesComponent } from './pages.component';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ComponentsModule } from '../components/components.module';
import { PodiumComponent } from './podium/podium.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RaceDialogComponent } from './game/race-dialog/race-dialog.component';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';
import { ConfigurationsModule } from './game/configurations/configurations.module';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    GameComponent,
    PodiumComponent,
    RaceDialogComponent,
    PathNotFoundComponent,

  ],

  imports: [
    CommonModule,
    PagesRoutingModule,
    UiModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule.forChild(),
    ConfigurationsModule,
    NbWindowModule.forChild(),
  ]

})
export class PagesModule { }
