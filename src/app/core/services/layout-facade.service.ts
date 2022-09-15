import { Injectable } from '@angular/core';
import { MessagesService, SharedService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class LayoutFacadeService {

  constructor( 
    private messageFacade: MessagesService,
    private gameService: SharedService) { }

  toggle(){
    this.messageFacade.toggle()
  }
  
  dataMenuGame$ = this.gameService.dataMenuGame$;

}
