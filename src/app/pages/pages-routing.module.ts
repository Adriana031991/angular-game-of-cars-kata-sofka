import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { RaceDialogComponent } from './game/race-dialog/race-dialog.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';
import { PodiumComponent } from './podium/podium.component';

const routes: Routes = [
  { path: '',
  component: PagesComponent,
  children: [
    { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home'} },
    { path: 'new-game', component: GameComponent, data: { breadcrumb: 'New-game'} },
    { path: 'podium', component: PodiumComponent, data: { breadcrumb: 'Podium'} },
  { path: 'rr', component: RaceDialogComponent},

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
