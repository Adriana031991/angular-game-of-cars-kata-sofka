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
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fa' });
    // this.iconLibraries.registerFontPack('solid', {packClass: 'fas', iconClassPrefix: 'fa'});
    // this.iconLibraries.registerFontPack('regular', {packClass: 'far', iconClassPrefix: 'fa'});
    // this.iconLibraries.registerFontPack('light', {packClass: 'fal', iconClassPrefix: 'fa'});
    // this.iconLibraries.registerFontPack('duotone', {packClass: 'fad', iconClassPrefix: 'fa'});
    // this.iconLibraries.registerFontPack('brands', {packClass: 'fab', iconClassPrefix: 'fa'});

    // this.iconLibraries.setDefaultPack('duotone');
    // this.iconLibraries.registerFontPack('font-awesome', {ligature: true});
    // this.iconLibraries.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    // this.iconLibraries.registerFontPack('fab', { packClass: 'fab', iconClassPrefix: 'fa' });
    // this.iconLibraries.setDefaultPack('font-awesome');

  }
}
