import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { RaceDialogComponent } from './pages/game/race-dialog/race-dialog.component';

const routes: Routes = [

  {
    path: 'layout',
    loadChildren: () =>
      import('./pages/pages.module').then(
        (m) => m.PagesModule
      ),
  },

  {
    path: '', redirectTo: 'layout/home', pathMatch: 'full'
  },



  { path: '**', redirectTo: 'layout/home' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
