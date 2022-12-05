import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn : 'root'})
export class LoaderService {

  private StateWebSite : BehaviorSubject<TypeState> ;

  constructor() {
    this.StateWebSite = new BehaviorSubject<TypeState>(TypeState.Activated) ;
  }

  GetListener() {
    return this.StateWebSite.asObservable() ;
  }

  GetSnapshotState() {
    return this.StateWebSite.getValue() ;
  }

  ActiveTask() {
    this.StateWebSite.next(TypeState.Busy) ;
  }

  DoneTask() {
    this.StateWebSite.next(TypeState.Activated) ;
  }

}

export enum TypeState {
  Busy ,
  Activated ,
}
