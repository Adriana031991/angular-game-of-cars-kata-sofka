import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { UiModule } from '../common/ui.module';
import { PagesComponent } from './pages.component';
import { NbDialogModule, NbMenuModule, NbWindowModule } from '@nebular/theme';
import { ComponentsModule } from '../components/components.module';
import { PodiumComponent } from './podium/podium.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RaceDialogComponent } from './game/race-dialog/race-dialog.component';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';
import { ConfigureGameComponent } from './game/configurations/configure-game/configure-game.component';
import { ConfigurationsComponent } from './game/configurations/configurations.component';
import { CreateCircuitComponent } from './game/configurations/create-circuit/create-circuit.component';
import { TableComponent } from './game/configurations/table/table.component';
import { DeleteDialogComponent } from './game/configurations/table/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './game/configurations/table/edit-dialog/edit-dialog.component';
import { ConfiguratiosModule } from './game/configurations/configuratios.module';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    GameComponent,
    PodiumComponent,
    RaceDialogComponent,
    PathNotFoundComponent,
    // ConfigureGameComponent,
    // ConfigurationsComponent,
    // CreateCircuitComponent,
    // TableComponent,
    // DeleteDialogComponent,
    // EditDialogComponent,
  ],

  imports: [
    CommonModule,
    PagesRoutingModule,
    UiModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule.forChild(),
    ConfiguratiosModule,
    NbWindowModule.forChild(),
  ]

})
export class PagesModule { }
