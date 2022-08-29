import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { CreateCircuitComponent } from './create-circuit/create-circuit.component';

import { DeleteDialogComponent } from './table/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './table/edit-dialog/edit-dialog.component';
import { ConfigureGameComponent } from './configure-game/configure-game.component';
import { ConfigurationsComponent } from './configurations.component';
import { UiModule } from 'src/app/common/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableCircuitsComponent } from './table-circuits/table-circuits.component';
import { TableWinnersComponent } from './table-winners/table-winners.component';
import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [
    ConfigurationsComponent,
    CreateCircuitComponent,
    TableComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    ConfigureGameComponent,
    TableCircuitsComponent,
    TableWinnersComponent,

  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  // exports: [ConfigurationsComponent]
})
export class ConfigurationsModule { }
