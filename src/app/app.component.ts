import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./Authentication/Authentication.service";
import {TypeState} from "./Component/Loader/Loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ViewNavigation : boolean ;

  constructor(private AuthenticationProcess : AuthenticationService) {
    this.ViewNavigation = false ;
  }

  ngOnInit(): void {
    /* Auto Login Process */
    this.AuthenticationProcess.ListenAccount().subscribe(Value => {
      if(Value != null)
        this.ViewNavigation = true ;
    });
  }

}
