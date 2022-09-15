import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'layout',
    loadChildren: () =>
      import('./feature3-game/game.module').then(
        (m) => m.GameModule
      ),
  },

  {
    path: '', redirectTo: 'layout/home', pathMatch: 'full'
  },



  { path: '**', redirectTo: 'layout/home' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules })], //pdte revisar
  exports: [RouterModule],
})
export class AppRoutingModule {}
