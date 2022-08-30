import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { UiModule } from '../common/ui.module';
import { PagesComponent } from './pages.component';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';
import { ConfigurationsModule } from './game/configurations/configurations.module';
import { GameModule } from './game/game.module';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
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
    GameModule
  ]

})
export class PagesModule { }
