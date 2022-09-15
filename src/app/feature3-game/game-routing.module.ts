import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './game.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { PodiumComponent } from './components/podium/podium.component';

const routes: Routes = [
  { path: '',
  component: GameComponent,
  children: [
    { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home'} },
    { path: '',
        loadChildren: () => import('../feature1-configurations-game/configurations.module').then((m) => m.ConfigurationsModule) },
    { path: '',
        loadChildren: () => import('../feature2-tables/tables.module').then((m) => m.TablesModule) },

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
export class GameRoutingModule { }
