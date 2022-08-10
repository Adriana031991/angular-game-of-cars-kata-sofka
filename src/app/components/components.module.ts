import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout/layout.component';
import { UiModule } from 'src/app/common/ui.module';
import { BreadcrumbsComponent } from '../pages/breadcrumbs/breadcrumbs.component';
import { PagesModule } from '../pages/pages.module';


@NgModule({
  declarations: [
    LayoutComponent,
    // BreadcrumbsComponent,
  ],
  imports: [
    CommonModule,
    UiModule,

  ],
  exports: [ LayoutComponent]
})
export class ComponentsModule {

}
