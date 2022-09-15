import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UiModule } from "../shared/ui.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesRoutingModule } from './tables-routing.module';
import { PlayersTableComponent } from './components/players-table/players-table.component';
import { CircuitsTableComponent } from './components/circuits-table/circuits-table.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { TableWinnersComponent } from './components/table-winners/table-winners.component';
import { LanesPipe } from './pipes/lanes.pipe';


@NgModule({
    imports: [
        CommonModule,
        UiModule,
        FormsModule,
        ReactiveFormsModule,
        TablesRoutingModule
    ],

    exports: [PlayersTableComponent],
    
    declarations: [
        CircuitsTableComponent,
        DeleteDialogComponent,
        EditDialogComponent,
        PlayersTableComponent,
        TableWinnersComponent,
        LanesPipe,
    ],
    providers: [],
})
export class TablesModule { }
