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
import { ConfigureGameComponent } from './game/configurations/configure-game/configure-game.component';
import { ConfigurationsComponent } from './game/configurations/configurations.component';
import { CreateCircuitComponent } from './game/configurations/create-circuit/create-circuit.component';
import { TableComponent } from './game/configurations/table/table.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    GameComponent,
    PodiumComponent,
    RaceDialogComponent,
    PathNotFoundComponent,
    ConfigureGameComponent,
    ConfigurationsComponent,
    CreateCircuitComponent,
    TableComponent,
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
