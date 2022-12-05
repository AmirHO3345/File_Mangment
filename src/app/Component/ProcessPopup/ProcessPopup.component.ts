import {Component, OnInit} from "@angular/core";
import {ProcessPopupService, TypePopupProcess} from "./ProcessPopup.service";

@Component({
  selector : 'PopupError' ,
  templateUrl : './ProcessPopup.component.html' ,
  styleUrls : ['./ProcessPopup.component.css']
})
export class ProcessPopupComponent implements OnInit{

  ProcessType : TypePopupProcess | null ;

  Message : string ;

  constructor(private PopupProcess : ProcessPopupService) {
    this.Message = '' ;
    this.ProcessType = null ;
  }

  ngOnInit(): void {
    this.PopupProcess.GetListener().subscribe(Value => {
      this.ProcessType = Value.TypeProcess ;
      this.Message = Value.Message ;
    });
  }

  ClosePopup() {
    this.ProcessType = null ;
    this.Message = '' ;
  }

  GetTypeProcess() {
    return TypePopupProcess
  }

}
