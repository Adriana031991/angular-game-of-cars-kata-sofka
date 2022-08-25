import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguratiosRoutingModule } from './configuratios-routing.module';
import { CreateCircuitComponent } from './create-circuit/create-circuit.component';
import { TableComponent } from './table/table.component';
import { DeleteDialogComponent } from './table/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './table/edit-dialog/edit-dialog.component';
import { ConfigureGameComponent } from './configure-game/configure-game.component';
import { ConfigurationsComponent } from './configurations.component';
import { UiModule } from 'src/app/common/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDialogModule } from '@nebular/theme';


@NgModule({
  declarations: [
    ConfigurationsComponent,
    CreateCircuitComponent,
    TableComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    ConfigureGameComponent,

  ],
  imports: [
    CommonModule,
    ConfiguratiosRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule.forChild(),

  ],
  // exports: [ConfigurationsComponent]
})
export class ConfiguratiosModule { }
