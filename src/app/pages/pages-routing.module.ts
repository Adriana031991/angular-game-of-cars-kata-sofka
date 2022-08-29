import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';
import { PodiumComponent } from './podium/podium.component';

const routes: Routes = [
  { path: '',
  component: PagesComponent,
  children: [
    { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home'} },
    { path: '',
        loadChildren: () => import('./game/configurations/configurations.module').then((m) => m.ConfigurationsModule) },

    { path: 'podium', component: PodiumComponent, data: { breadcrumb: 'Podium'} },

    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    { path: '**', component: PathNotFoundComponent },

  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
