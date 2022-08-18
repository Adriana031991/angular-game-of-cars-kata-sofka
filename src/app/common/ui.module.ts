import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NbEvaIconsModule } from '@nebular/eva-icons';

import {
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbMenuService,
  NbSidebarService,
  NbIconModule,
  NbCardModule,
  NbMenuModule,
  NbActionsModule,
  NbInputModule,
  NbSelectModule,
  NbUserModule,
  NbTreeGridModule,
} from '@nebular/theme';

const MODULES_NEBULAR = [
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbEvaIconsModule,
  FontAwesomeModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbSelectModule,
  NbTreeGridModule,
  NbUserModule,

];

@NgModule({
  declarations: [],
  imports: [],
  exports: [MODULES_NEBULAR],
  providers: [NbMenuService, NbSidebarService],
})
export class UiModule {}
