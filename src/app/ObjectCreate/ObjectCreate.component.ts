import {Component, EventEmitter, Output} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Singleton} from "../Models/Singleton";

@Component({
  selector : 'NewObject' ,
  templateUrl : './ObjectCreate.component.html' ,
  styleUrls : ['./ObjectCreate.component.css']
})
export class ObjectCreateComponent {

  @Output('Close') CloseComponent : EventEmitter<void>

  constructor() {
    this.CloseComponent = new EventEmitter<void>() ;
  }

  OnSubmit(InfoForm : NgForm) {}

  public ClosePopup() {
    this.CloseComponent.next();
  }

  public GetSingleton() {
    return Singleton ;
  }

}
