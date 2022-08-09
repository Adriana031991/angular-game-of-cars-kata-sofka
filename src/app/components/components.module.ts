import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout/layout.component';
import { UiModule } from 'src/app/common/ui.module';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';


@NgModule({
  declarations: [
    LayoutComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    CommonModule,
    UiModule,
    
  ],
  exports: [ LayoutComponent]
})
export class ComponentsModule {

}
