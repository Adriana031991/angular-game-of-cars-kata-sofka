import { Injectable, TemplateRef, Type } from '@angular/core';
import { NbComponentStatus, NbDialogService, NbGlobalLogicalPosition, NbSidebarService, NbToastrService, NbWindowService } from '@nebular/theme';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(    
    private sidebarService: NbSidebarService,
    private dialogService: NbDialogService,
    private windowService: NbWindowService,
    private toast: NbToastrService,) { }

  modalDialog(
    message: string,
    component: Type<{ title: string, data?:any }> | TemplateRef<{ title: any, data?:any }>,
    value?: any
  ) {

    this.dialogService.open(component, {
      context: {
        title: message,
        data: value
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }

  toggle() {
    this.sidebarService.toggle(true);
    console.log('toggle')
    return false;
  }

  modalWindow(component: any){
    this.windowService.open(component, { title: `Window` });

  }


  toastr(status:NbComponentStatus, title: string){
    this.toast.show(status, title, {status, position:NbGlobalLogicalPosition.BOTTOM_END } )
  }


  errorMessage(err: any) {
    const errMessage = err.error?.message
      ? err.error.message
      : 'Problem Communicating With Servers';
    this.toastr('danger', errMessage);
  }

}
