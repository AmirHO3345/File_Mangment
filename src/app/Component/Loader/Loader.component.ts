import {Component, Input} from "@angular/core";

@Component({
  selector : 'Loader' ,
  templateUrl : './Loader.component.html' ,
  styleUrls : ['./Loader.component.css']
})
export class LoaderComponent {

  IsCover : boolean ;

  @Input('LoaderType') set SetType(TypeName : string) {
    this.IsCover = (TypeName === "cover") ;
  }

  constructor() {
    this.IsCover = true ;
  }

}
