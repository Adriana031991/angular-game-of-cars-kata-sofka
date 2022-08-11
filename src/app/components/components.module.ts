import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout/layout.component';
import { UiModule } from 'src/app/common/ui.module';


@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    UiModule,

  ],
  exports: [ LayoutComponent]
})
export class ComponentsModule {

}
