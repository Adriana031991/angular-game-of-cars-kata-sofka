import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircuitsTableComponent } from './components/circuits-table/circuits-table.component';
import { TableWinnersComponent } from './components/table-winners/table-winners.component';

export const routes: Routes = [
    { path: 'game',
  children: [
    { path: 'table-circuit', component: CircuitsTableComponent, data: { breadcrumb: 'Table Circuit' } },
    { path: 'all-winners', component: TableWinnersComponent, data: { breadcrumb: 'All Winners' } },
  ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TablesRoutingModule { }
