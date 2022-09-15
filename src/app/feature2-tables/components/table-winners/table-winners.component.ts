import { Component, OnInit } from '@angular/core';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { RoutesFacadeService } from 'src/app/shared/services/routes-facade.service';
import { CallToBackendService } from 'src/app/shared/services/call-to-backend.service';

@Component({
  selector: 'app-table-winners',
  templateUrl: './table-winners.component.html',
  styleUrls: ['./table-winners.component.scss']
})
export class TableWinnersComponent implements OnInit {
  customColumn = 'id';
  defaultColumns = ['name', 'kilometers', 'amount_Lanes', 'actions'];

  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource!: NbTreeGridDataSource<any>;

  
  constructor(    
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>,
    // private server: CallToBackendService,
    // private facadeService: RoutesFacadeService
    ) { }

  ngOnInit(): void {
    this.dataSource = this.dataSourceBuilder.create([]);

  }

}
