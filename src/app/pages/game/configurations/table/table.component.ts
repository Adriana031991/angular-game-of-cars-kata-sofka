import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbDialogService,
  NbIconLibraries,
  NbMenuService,
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';
import { SharedService } from 'src/app/services/shared.service';
import { map, Subject, takeUntil } from 'rxjs';
import { DataTable, TableNode } from 'src/app/common/models/table.interface';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FacadeService } from 'src/app/pages/services/facade.service';
import { DataPlayer, Driver } from 'src/app/common/models/player-interfaces';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';



@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})

export class TableComponent implements OnInit, OnDestroy {
  destroyConfigure$ = new Subject<void>();

  configureForm$ = this.sharedService.configureFormSubject$
    .pipe(
      map((resp: any) => (resp.dataDrivers)),
      takeUntil(this.destroyConfigure$))
    .subscribe((result: any) => {

      // const { dataDrivers } = result;
      const newData: TableNode<DataTable>[] = result.map((res: any) => ({
        data: { name: res.driver.name, id: res.driver.id },
      }));
      this.dataSource1.setData(newData);
      this.changeDetection.detectChanges();
    });

  defaultColumns1 = ['name', 'actions'];
  allColumns1 = ['N°', ...this.defaultColumns1];
  dataSource1!: NbTreeGridDataSource<DataTable>;
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  itemsOfActionsTable = [
    { title: 'Edit',icon: 'edit-outline' },
    { title: 'Delete', icon: 'trash-2-outline'}
  ];

  constructor(
    private sharedService: SharedService,
    private changeDetection: ChangeDetectorRef,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>,
    private nbMenuService: NbMenuService,
    private server: CallToBackendService,
    private facadeService: FacadeService
  ) {


  }

  ngOnDestroy(): void {
    this.destroyConfigure$.next();
    this.destroyConfigure$.complete();
  }

  ngOnInit(): void {
    this.dataSource1 = this.dataSourceBuilder.create([]);

  }



  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  edit(value:Driver){
    console.log('edit player', value)
    this.facadeService.modalDialog('Editing Player',EditDialogComponent , value)

  }

  delete(id:any){
    console.log('delete player', id)
    this.facadeService.modalDialog('Editing Player',DeleteDialogComponent , id)

  }


}
