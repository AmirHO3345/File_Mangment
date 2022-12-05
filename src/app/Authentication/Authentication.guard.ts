import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable} from "rxjs";
import {AuthenticationService} from "./Authentication.service";
import {Singleton} from "../Models/Singleton";
import {RoutingProcessService} from "../Routing/RoutingProcess.service";
import {LoaderService} from "../Component/Loader/Loader.service";

@Injectable({providedIn : "root"})
export class AuthenticationGuard implements CanActivate {

  constructor(private AuthenticationProcess : AuthenticationService ,
              private RoutingProcess : RoutingProcessService ,
              private LoadingProcess : LoaderService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> | boolean | UrlTree {
    this.LoadingProcess.ActiveTask() ;
    if(this.AuthenticationProcess.AccountSnapshot() != null) {
      this.LoadingProcess.DoneTask() ;
      return true ;
    }
    const LoginProcess = this.AuthenticationProcess.AutoLogin() ;
    if(LoginProcess instanceof Observable)
      return LoginProcess.pipe(map(Value => {
        this.LoadingProcess.DoneTask() ;
        if(Value)
          return true ;
        else
          return this.RoutingProcess
            .GetUrlTree(['/' , `${Singleton.RoutingPage.Authentication.SignIn}`]) ;
      })) ;
    this.LoadingProcess.DoneTask() ;
    return this.RoutingProcess
      .GetUrlTree(['/' , `${Singleton.RoutingPage.Authentication.SignIn}`]) ;
  }

}
