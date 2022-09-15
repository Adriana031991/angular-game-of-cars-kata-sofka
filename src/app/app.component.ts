import { Component } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'juego-de-carros-front-angular-13';

  constructor(
    private iconLibraries: NbIconLibraries,

  ){
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fa'});
    this.iconLibraries.setDefaultPack('font-awesome');

  }
}
