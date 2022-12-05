import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./Authentication/Authentication.service";
import {Observable} from "rxjs";
import {RoutingProcessService} from "./Routing/RoutingProcess.service";
import {LoaderService, TypeState} from "./Component/Loader/Loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  LoadProcess : boolean ;

  ViewNavigation : boolean ;

  constructor(private AuthenticationProcess : AuthenticationService ,
              private LoaderProcess : LoaderService) {
    this.ViewNavigation = this.LoadProcess = false ;
  }

  ngOnInit(): void {
    /* Auto Login Process */
    this.AuthenticationProcess.ListenAccount().subscribe(Value => {
      if(Value != null)
        this.ViewNavigation = true ;
    });
    /* Loading Process */
    // this.LoaderProcess.GetListener().subscribe(Value => {
    //   if(Value === TypeState.Busy)
    //     this.LoadProcess = false ;
    //   else if(Value === TypeState.Activated)
    //     this.LoadProcess = true ;
    // });
  }

}
