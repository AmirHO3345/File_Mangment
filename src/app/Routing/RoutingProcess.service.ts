import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({providedIn : 'root'})
export class RoutingProcessService {

  constructor(private RouterPage : Router) {}

  public Route2Login() {
    this.RouterPage.navigate(['/' , 'signIn']);
  }

  public Route2Signup() {

  }

  public Route2PrivateGroupFile(GroupID : number) {
    this.RouterPage.navigate(['/' , 'GroupFile' , `${GroupID}`]);
  }

  public Route2IncludeGroupFile(GroupID : number) {
    this.RouterPage.navigate(['/' , 'GroupFile' , `${GroupID}`]);
  }

  public Route2MainPage() {
    this.RouterPage.navigate(['/' , 'publicGroup']);
  }

  public CurrentURl() {
    return this.RouterPage.url.split('/')
  }

  public RefreshPage() {
    location.reload();
  }

}
