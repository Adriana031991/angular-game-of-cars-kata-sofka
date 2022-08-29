import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbMenuService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { map, Subject, takeUntil } from 'rxjs';
import { Circuit } from 'src/app/common/models/results-game.interface';
import { TableNode } from 'src/app/common/models/table.interface';
import { FacadeService } from 'src/app/pages/services/facade.service';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-table-circuits',
  templateUrl: './table-circuits.component.html',
  styleUrls: ['./table-circuits.component.scss']
})
export class TableCircuitsComponent implements OnInit {

  destroyListOfTracks$ = new Subject<void>();

    listOfTracks$ = this.server.listCircuits$.pipe(
      map((resp: any) => {return resp['data'];}),
      takeUntil(this.destroyListOfTracks$))
      .subscribe((data: any) => {
        const newData: TableNode<Circuit>[] = data.map((res: Circuit) =>
        {
          console.log('res', res);

         return {data: { id: res.id, name: res.name, lanes: res.lanes, kilometers: res.kilometers}}
        }
        );
        // console.log('circuits res', data)
        // console.log('newData', newData)
        this.dataSource.setData(newData);
        this.changeDetection.detectChanges();

      }
    );

  customColumn = 'Id';
  defaultColumns =   ['name','lanes','kilometers', 'actions'];
  allColumns =       [this.customColumn, ...this.defaultColumns];
  dataSource!:        NbTreeGridDataSource<Circuit>;
  sortColumn: string = '';
  sortDirection:      NbSortDirection = NbSortDirection.NONE;


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

  edit(value:any){
    console.log('edit circuit', value)
    // this.facadeService.modalDialog('Editing Player',EditDialogComponent , value)

  }

  delete(value:any){
    console.log('delete circuit', value)
    // this.facadeService.modalDialog('Eliminate Player',DeleteDialogComponent , value)

  }

}
