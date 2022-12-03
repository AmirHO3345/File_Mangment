import {AfterViewInit, Component, Input, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector : 'Selector-Form' ,
  templateUrl : './Selector.component.html' ,
  styleUrls : ['./Selector.component.css']
})
export class SelectorComponent {

  @Input('Name') SelectorName : string ;

  @Input('Require') RequireSelector : boolean ;

  @Input('FormName') SelectorForm !: NgForm ;

  @Input('Values') SelectorValues : string[] ;

  @Input('DefaultValue') SelectorValueDefault : string ;

  OpenOption : boolean ;

  constructor() {
    this.SelectorName = '' ;
    this.OpenOption = false ;
    this.SelectorValues = [] ;
    this.SelectorValueDefault = '' ;
    this.RequireSelector = false ;
  }

  onClickOption(FormInfo : NgForm , Value : string) {
    FormInfo.form.controls[this.SelectorName].setValue(Value)  ;
    this.SelectorForm.form.controls[this.SelectorName] =
      FormInfo.form.controls[this.SelectorName] ;
  }

  onOpenOption() {
    this.OpenOption = !this.OpenOption ;
  }

  onCloseOption() {
    this.OpenOption = false ;
  }

}
