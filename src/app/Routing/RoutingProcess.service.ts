import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({providedIn : 'root'})
export class RoutingProcessService {

  constructor(private RouterPage : Router) {}

  public Route2Login() {
    this.RouterPage.navigate(['/' , 'SignIn']);
  }

  public Route2Signup() {

  }

  public Route2MainPage() {
    this.RouterPage.navigate(['/' , 'publicGroup']);
  }

  public RefreshPage() {
    location.reload();
  }

}
