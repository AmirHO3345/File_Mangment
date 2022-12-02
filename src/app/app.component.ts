import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./Authentication/Authentication.service";
import {Observable} from "rxjs";
import {RoutingProcessService} from "./Routing/RoutingProcess.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  LoadProcess : boolean ;

  IsLogin : boolean ;

  constructor(public AuthenticationProcess : AuthenticationService ,
              public ProcessRouting : RoutingProcessService) {
    // this.LoadProcess = true ;
    // this.IsLogin = false ;

    this.LoadProcess = false ;
    this.IsLogin = true ;
  }

  ngOnInit(): void {
    // const LoginProcess = this.AuthenticationProcess.AutoLogin() ;
    // if(LoginProcess instanceof Observable)
    //   LoginProcess.subscribe(() => {
    //     this.LoadProcess = false ;
    //     this.IsLogin = true ;
    //     this.ProcessRouting.Route2MainPage() ;
    //   } , () => {
    //     this.LoadProcess = this.IsLogin = false ;
    //     this.ProcessRouting.Route2Login();
    //   });
    // else {
    //   this.LoadProcess = this.IsLogin = false ;
    //   this.ProcessRouting.Route2Login();
    // }
  }

}
