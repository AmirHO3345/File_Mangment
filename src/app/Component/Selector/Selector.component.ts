import {Component, Input} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Singleton} from "../../Models/Singleton";

@Component({
  selector : 'Selector-Form' ,
  templateUrl : './Selector.component.html' ,
  styleUrls : ['./Selector.component.css']
})
export class SelectorComponent {

  @Input('Name') SelectorName : string ;

  @Input('FormName') SelectorForm !: NgForm ;

  @Input('Values') SelectorValues : string[] ;

  @Input('DefaultValue') SelectorValueDefault : string ;

  OpenOption : boolean ;

  constructor() {
    this.SelectorName = '' ;
    this.OpenOption = false ;
    this.SelectorValues = [] ;
    this.SelectorValueDefault = '' ;
  }

  onClickOption(FormInfo : NgForm , Value : string) {
    console.log('Before' ,this.SelectorForm);
    FormInfo.form.controls[this.SelectorName].setValue(Value)  ;
    this.SelectorForm.form.controls[this.SelectorName] =
      FormInfo.form.controls[this.SelectorName] ;
    console.log('After' ,this.SelectorForm);
  }

  onOpenOption() {
    this.OpenOption = !this.OpenOption ;
  }

  onCloseOption() {
    this.OpenOption = false ;
  }

}
