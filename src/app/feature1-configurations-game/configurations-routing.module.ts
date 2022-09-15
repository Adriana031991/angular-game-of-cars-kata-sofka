import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationsComponent } from './configurations.component';


const routes: Routes = [
  { path: 'game',
  children: [
    { path: 'new-game', component: ConfigurationsComponent, data: { breadcrumb: 'Configurations'} },

]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
 