import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircuitsTableComponent } from './circuits-table/circuits-table.component';
import { ConfigurationsComponent } from './configurations.component';
import { TableWinnersComponent } from './table-winners/table-winners.component';


const routes: Routes = [
  { path: 'game',
  children: [
    { path: 'new-game', component: ConfigurationsComponent, data: { breadcrumb: 'Configurations'} },
    { path: 'table-circuit', component: CircuitsTableComponent, data: { breadcrumb: 'Table Circuit'} },
    { path: 'all-winners', component: TableWinnersComponent, data: { breadcrumb: 'All Winners'} },
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
