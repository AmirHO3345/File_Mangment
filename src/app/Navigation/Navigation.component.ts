import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthenticationService} from "../Authentication/Authentication.service";
import {RoutingProcessService} from "../Routing/RoutingProcess.service";
import {Subscription} from "rxjs";
import {Person} from "../Models/Person";

@Component({
  selector : 'Navigations' ,
  templateUrl : './Navigation.component.html' ,
  styleUrls : ['./Navigation.component.css']
})
export class NavigationComponent implements OnInit , OnDestroy {

  NewObjectOpen : boolean ;

  UserAccount : Person | null ;

  AccountListener !: Subscription ;

  constructor(public AuthenticationProcess : AuthenticationService ,
              public ProcessRouting : RoutingProcessService) {
    this.NewObjectOpen = false ;
    this.UserAccount = null ;
  }

  ngOnInit(): void {
    this.AccountListener = this.AuthenticationProcess.ListenAccount()
      .subscribe(Value => {
      this.UserAccount = Value
    }) ;
  }

  OpenPopup() {
    this.NewObjectOpen = true ;
  }

  ClosePopup() {
    this.NewObjectOpen = false ;
  }

  onLogout() {
    this.AuthenticationProcess.SignOut().subscribe(() => {
      this.ProcessRouting.RefreshPage();
    });
  }

  ngOnDestroy(): void {
    if(this.AccountListener)
      this.AccountListener.unsubscribe() ;
  }

}
