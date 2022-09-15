import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { map, Subject, takeUntil } from 'rxjs';
import { Circuit, Lane } from 'src/app/shared/models/results-game.interface';
import { TableCircuits } from 'src/app/shared/models/table.interface';
import { TableFacadeService } from '../../services/table-facade.service';

@Component({
  selector: 'app-circuits-table',
  templateUrl: './circuits-table.component.html',
  styleUrls: ['./circuits-table.component.scss']
})
export class CircuitsTableComponent implements OnInit, OnDestroy {

  destroyListOfTracks$ = new Subject<void>();

  listOfTracks$ = this.tableFacade.listOfTracks$
    .pipe(
      takeUntil(this.destroyListOfTracks$))
    .subscribe((data: any) => {
      this.orderDataForTable(data);
      this.dataSource.setData(this.newData);
      this.changeDetection.detectChanges();

    }
    );


  newData!: TableCircuits<Circuit>[];
  customColumn = 'id';
  defaultColumns = ['name', 'kilometers', 'amount_Lanes', 'actions'];

  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource!: NbTreeGridDataSource<Circuit>;
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  laneOfCircuit!: Lane;

  constructor(
    private tableFacade: TableFacadeService,
    private changeDetection: ChangeDetectorRef,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>,

  ) {


  }

  ngOnDestroy(): void {
    this.destroyListOfTracks$.next();
    this.destroyListOfTracks$.complete();
  }

  ngOnInit(): void {

    this.dataSource = this.dataSourceBuilder.create([]);

  }

  orderDataForTable(data : any) {
    this.newData =data.forEach((res: Circuit) => {
      if (res.lanes.length > 0) {
  
        return {
          data: { id: res.id, name: res.name, amount_Lanes: res.lanes, kilometers: res.kilometers },
          children:
            res.lanes.map(l =>
              ({ data: { id: l.idLane, name: l.name, kilometers: l.car } })
            )
        }
  
      } else {
        return {
          data: {
            id: res.id, name: res.name, amount_Lanes: res.lanes, kilometers: res.kilometers
          }
        }
      }
    });
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

  edit(value: Circuit) {
    this.tableFacade.edit('Editing Circuit', value);
  }

  delete(value: Circuit) {

    if (value.name === null) {
      value.name = 'Circuit whitout name'
    }
    this.tableFacade.delete('Eliminate circuit', value);

  }

}
