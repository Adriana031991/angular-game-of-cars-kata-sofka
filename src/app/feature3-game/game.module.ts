import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NbDialogModule, NbWindowModule } from '@nebular/theme';

import { UiModule } from "../shared/ui.module";
import { CoreModule } from "../core/core.module";
import { GameRoutingModule } from "./game-routing.module";

import { RaceDialogComponent } from "./components/race-dialog/race-dialog.component";
import { GameComponent } from "./game.component";
import { HomeComponent } from "./components/home/home.component";
import { PathNotFoundComponent } from "./components/path-not-found/path-not-found.component";
import { PodiumComponent } from "./components/podium/podium.component";


@NgModule({
  declarations: [
    GameComponent,
    HomeComponent,
    PathNotFoundComponent,
    RaceDialogComponent,
    PodiumComponent
  ],

  imports: [
    CommonModule,
    GameRoutingModule,
    UiModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),

  ]

})
export class GameModule { }
