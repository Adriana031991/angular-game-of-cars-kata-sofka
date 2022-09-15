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
  NbContextMenuModule,
  NbWindowModule,
  NbListModule,
  NbFormFieldModule,
  NbTooltipModule,
  NbAlertModule,
  NbPopoverModule,
} from '@nebular/theme';

const MODULES_NEBULAR = [
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbEvaIconsModule,
  FontAwesomeModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,

  NbLayoutModule,
  NbMenuModule,
  NbPopoverModule,
  NbSidebarModule,
  NbSelectModule,
  NbTreeGridModule,
  NbTooltipModule,
  NbUserModule,
  NbWindowModule

];

@NgModule({
  declarations: [],
  imports: [],
  exports: [MODULES_NEBULAR],
  providers: [NbMenuService, NbSidebarService],
})
export class UiModule {}