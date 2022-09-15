import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';

import { map, Subject, takeUntil } from 'rxjs';
import { TableNode, DataTablePlayer } from 'src/app/shared/models/table.interface';

import { Driver } from 'src/app/shared/models/player-interfaces';

import { TableFacadeService } from '../../services/table-facade.service';



@Component({
  selector: 'app-player-table-component',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.scss'],
})

export class PlayersTableComponent implements OnInit, OnDestroy {
  destroyConfigure$ = new Subject<void>();

  configureForm$ = this.tableFacade.configureForm$
    .pipe(
      map((resp: any) => (resp.dataDrivers)),
      takeUntil(this.destroyConfigure$))
    .subscribe((result: any) => {
      const newData: TableNode<DataTablePlayer>[] = result.map((res: any) => ({
        data: { name: res.driver.name, id: res.driver.id },
      }));
      this.dataSource1.setData(newData);
      this.changeDetection.detectChanges();
    });

  customColumn = 'n°'
  defaultColumns1 = ['name', 'actions'];
  allColumns1 = [this.customColumn, ...this.defaultColumns1];
  dataSource1!: NbTreeGridDataSource<DataTablePlayer>;
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;


  constructor(
    private tableFacade: TableFacadeService,
    private changeDetection: ChangeDetectorRef,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>,

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

  edit(value: Driver) {
    console.log('edit player', value)
    this.tableFacade.edit('Editing Player', value);
  }

  delete(value: Driver) {
    console.log('delete player', value)
    this.tableFacade.delete('Eliminate Player', value);
  }

 
}
