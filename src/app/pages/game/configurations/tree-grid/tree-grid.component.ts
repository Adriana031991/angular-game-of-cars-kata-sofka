import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { FacadeService } from 'src/app/pages/services/facade.service';
import { SharedService } from 'src/app/services/shared.service';
import { Subject, takeUntil } from 'rxjs';
import { Car, Player } from 'src/app/common/models/results-game.interface';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

interface DataTable {
  name: string;

}

@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss'],
})
export class TreeGridComponent implements OnInit {
// informacion del intento de adriana
  destroyConfigure$ = new Subject<void>();

  drivers: any[]= [];

  configureForm$ = this.sharedService.configureFormSubject$
    .pipe(takeUntil(this.destroyConfigure$))
    .subscribe(
       (result:any) => {
      const {dataDrivers} = result;

      this.drivers= dataDrivers.map((res:any) => res.driver.name);
      // this.drivers= dataDrivers;
      this.dataSource1 = this.dataSourceBuilder.create(this.data1);//adriana
      this.changeDetection.detectChanges();


    }
    )

    // a = this.drivers.map(res => res.name)
  defaultColumns1 = [ 'name'];
  allColumns1 = [ 'N°', ...this.defaultColumns1 ];

  dataSource1!: NbTreeGridDataSource<DataTable>;

  //adriana  aqui esta el meollo
  private data1: TreeNode<DataTable>[] = [{data:{ name:'prueba'}}];
  // private data1: TreeNode<Car>[] = [{data:{id: this.id, nameCar:this.nameCar, driver: this.driver, routeMts:this.routeMts, winner: this.winner}}];


  // copie y pegue libreria

  defaultColumns = [ 'size', 'kind', 'items' ];
  allColumns = [ 'name', ...this.defaultColumns ];

  dataSource!: NbTreeGridDataSource<FSEntry>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private sharedService: SharedService,
    private changeDetection: ChangeDetectorRef,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) {
    }
    ngOnInit(): void {
    this.dataSource = this.dataSourceBuilder.create(this.data);//libreria

  }
// libreria
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
    console.log('shared data form to table', this.drivers)

  }
// libreria
  getSortDirection(column: string): NbSortDirection {
    // console.log('heey', this.dataSource1)
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }


  //libreria
  private data: TreeNode<FSEntry>[] = [
    {
      data: { name: 'Projects', size: '1.8 MB', items: 5, kind: 'dir' },
      children: [
        { data: { name: 'project-1.doc', kind: 'doc', size: '240 KB' } },
        { data: { name: 'project-2.doc', kind: 'doc', size: '290 KB' } },
        { data: { name: 'project-3', kind: 'txt', size: '466 KB' } },
        { data: { name: 'project-4.docx', kind: 'docx', size: '900 KB' } },
      ],
    },
    {
      data: { name: 'Reports', kind: 'dir', size: '400 KB', items: 2 },
      children: [
        { data: { name: 'Report 1', kind: 'doc', size: '100 KB' } },
        { data: { name: 'Report 2', kind: 'doc', size: '300 KB' } },
      ],
    },
    {
      data: { name: 'Other', kind: 'dir', size: '109 MB', items: 2 },
      children: [
        { data: { name: 'backup.bkp', kind: 'bkp', size: '107 MB' } },
        { data: { name: 'secret-note.txt', kind: 'txt', size: '2 MB' } },
      ],
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    // console.log('getShow', minWithForMultipleColumns + (nextColumnStep * index))
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}


// libreria
@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind!: string;
  @Input() expanded!: boolean;

  isDir(): boolean {
    // console.log('fsicon', this.kind, this.expanded)
    return this.kind === 'dir';
  }
}

