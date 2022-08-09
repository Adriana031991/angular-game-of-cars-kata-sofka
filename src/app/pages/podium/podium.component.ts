import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FacadeService } from 'src/app/services/facade.service';
import { SelectItemService } from 'src/app/services/select-item.service';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss']
})
export class PodiumComponent implements OnInit {

  winners: string[] = [];
  resultsGame$ = this.selectedItem.selectedItem$.pipe(map((resp:any) => {return resp['data'];}));

  constructor( private facadeService: FacadeService, private selectedItem: SelectItemService) { }

  ngOnInit(): void {
  }

  startNewGame() {
    this.facadeService.navigateToNewGame();
  }

}
