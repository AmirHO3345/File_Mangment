import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({providedIn : "root"})
export class ProcessPopupService {

  private ResultProcess : Subject<{
    TypeProcess : TypePopupProcess ,
    Message : string
  }> ;

  constructor() {
    this.ResultProcess = new Subject<{TypeProcess: TypePopupProcess; Message: string}>() ;
  }

  public GetListener() {
    return this.ResultProcess.asObservable() ;
  }

  public ViewPopup(PopType : 'Error' | 'Success' , Message : string) {
    let ProcessType !: TypePopupProcess ;
    if(PopType == "Error")
      ProcessType = TypePopupProcess.ErrorResult ;
    else if(PopType == "Success")
      ProcessType = TypePopupProcess.SuccessResult ;
    this.ResultProcess.next({
      TypeProcess : ProcessType ,
      Message : Message
    }) ;
  }

}

export enum TypePopupProcess {
  ErrorResult ,
  SuccessResult
}
