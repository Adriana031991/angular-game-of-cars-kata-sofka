import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { map, Subject, takeUntil } from 'rxjs';
import { Circuit, Lane } from 'src/app/common/models/results-game.interface';
import { TableCircuits } from 'src/app/common/models/table.interface';
import { FacadeService } from 'src/app/pages/services/facade.service';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-circuits-table',
  templateUrl: './circuits-table.component.html',
  styleUrls: ['./circuits-table.component.scss']
})
export class CircuitsTableComponent implements OnInit, OnDestroy {

  destroyListOfTracks$ = new Subject<void>();

  listOfTracks$ = this.server.listCircuits$.pipe(
    map((resp: any) => { return resp['data']; }),
    takeUntil(this.destroyListOfTracks$))
    .subscribe((data: any) => {

      const newData: TableCircuits<Circuit>[] = data.map((res: Circuit) => {


        if (res.lanes.length > 0) {

          res.lanes.map((l) => this.laneOfCircuit = l);

          return {
            data: { id: res.id, name: res.name, lanes: res.lanes, kilometers: res.kilometers },
            children: [{ data: { nameLane: this.laneOfCircuit.name, car:this.laneOfCircuit.car } }] }
        } else {
          return {
            data: {
              id: res.id, name: res.name, lanes: res.lanes,kilometers: res.kilometers} }
        }
      });

      this.dataSource.setData(newData);
      console.log('datasource', this.dataSource)
      this.changeDetection.detectChanges();

    }
    );

  customColumn      = 'id';
  defaultColumns    = ['name',  'kilometers','lanes', 'actions'];
  columnsOfLane     = ['nameLane', 'car']
  allColumns        = [this.customColumn, ...this.defaultColumns];

  dataSource!: NbTreeGridDataSource<Circuit>;
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  laneOfCircuit!: Lane;

  constructor(
    private sharedService: SharedService,
    private changeDetection: ChangeDetectorRef,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>,
    // private nbMenuService: NbMenuService,
    private server: CallToBackendService,
    private facadeService: FacadeService
  ) {


  }

  ngOnDestroy(): void {
    this.destroyListOfTracks$.next();
    this.destroyListOfTracks$.complete();
  }

  ngOnInit(): void {
    this.dataSource = this.dataSourceBuilder.create([]);

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

  edit(value: any) {
    console.log('edit circuit', value)
    // this.facadeService.modalDialog('Editing Player',EditDialogComponent , value)

  }

  delete(value: any) {
    console.log('delete circuit', value)
    // this.facadeService.modalDialog('Eliminate Player',DeleteDialogComponent , value)

  }

}
