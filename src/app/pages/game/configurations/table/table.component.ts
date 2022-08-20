import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';
import { SharedService } from 'src/app/services/shared.service';
import { Subject, takeUntil } from 'rxjs';
import { DataTable, TableNode } from 'src/app/common/models/table.interface';



@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})

export class TableComponent implements OnInit, OnDestroy {
  destroyConfigure$ = new Subject<void>();

  configureForm$ = this.sharedService.configureFormSubject$
    .pipe(takeUntil(this.destroyConfigure$))
    .subscribe((result: any) => {
      const { dataDrivers } = result;

      const newData: TableNode<DataTable>[] = dataDrivers.map((res: any) => ({
        data: { name: res.driver.name },
      }));

      this.dataSource1.setData(newData);

      this.changeDetection.detectChanges();
    });

  defaultColumns1 = ['name'];
  allColumns1 = ['N°', ...this.defaultColumns1];

  dataSource1!: NbTreeGridDataSource<DataTable>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private sharedService: SharedService,
    private changeDetection: ChangeDetectorRef,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>
  ) {}

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
}
