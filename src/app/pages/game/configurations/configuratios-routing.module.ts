import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationsComponent } from './configurations.component';
import { ConfigureGameComponent } from './configure-game/configure-game.component';
import { CreateCircuitComponent } from './create-circuit/create-circuit.component';

const routes: Routes = [
  { path: '',
  component: ConfigurationsComponent,
  children: [
    { path: 'configure-game', component: ConfigureGameComponent, data: { breadcrumb: 'Configure Game'} },
    { path: 'create-circuit', component: CreateCircuitComponent, data: { breadcrumb: 'Create Circuit'} },
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguratiosRoutingModule { }
