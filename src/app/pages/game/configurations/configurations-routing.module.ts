import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationsComponent } from './configurations.component';
import { TableCircuitsComponent } from './table-circuits/table-circuits.component';
import { TableWinnersComponent } from './table-winners/table-winners.component';


const routes: Routes = [
  { path: 'game',
  children: [
    { path: 'new-game', component: ConfigurationsComponent, data: { breadcrumb: 'Configurations'} },
    { path: 'table-circuit', component: TableCircuitsComponent, data: { breadcrumb: 'Table Circuit'} },
    { path: 'all-winners', component: TableWinnersComponent, data: { breadcrumb: 'All Winners'} },
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
