import { ChangeDetectorRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCircuitComponent } from './pages/create-circuit/create-circuit.component';
import { ConfigureGameComponent } from './pages/configure-game/configure-game.component';
import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { UiModule } from '../shared/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesModule } from '../feature2-tables/tables.module';
import { ConfigurationsComponent } from './configurations.component';




@NgModule({
  declarations: [
    CreateCircuitComponent,
    ConfigureGameComponent,
    ConfigurationsComponent

  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    TablesModule

  ],
  exports: [CreateCircuitComponent,
    ConfigureGameComponent,
    ConfigurationsComponent],
    providers: []
})
export class ConfigurationsModule { }
