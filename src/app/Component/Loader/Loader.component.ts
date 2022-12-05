import {Component, Input, OnInit} from "@angular/core";
import {LoaderService, TypeState} from "./Loader.service";

@Component({
  selector : 'Loader' ,
  templateUrl : './Loader.component.html' ,
  styleUrls : ['./Loader.component.css']
})
export class LoaderComponent implements OnInit{

  ViewLoader : boolean ;

  IsCover : boolean ;

  @Input('LoaderType') set SetType(TypeName : string) {
    this.IsCover = (TypeName === "cover") ;
  }

  constructor(private LoaderProcess : LoaderService) {
    this.ViewLoader = false ;
    this.IsCover = true ;
  }

  ngOnInit(): void {
    this.LoaderProcess.GetListener().subscribe(Value => {
      this.ViewLoader = (Value === TypeState.Busy) ;
    });
  }

}
