import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Singleton} from "../Models/Singleton";

@Injectable({providedIn : 'root'})
export class RoutingProcessService {

  constructor(private RouterPage : Router) {}

  public Route2Login() {
    this.RouterPage.navigate(['/' , `${Singleton.RoutingPage.Authentication.SignIn}`]);
  }

  public Route2PrivateGroupFile(GroupID : number) {
    this.RouterPage.navigate(['/' , `${Singleton.RoutingPage.Files}` , `${GroupID}`]);
  }

  public Route2IncludeGroupFile(GroupID : number) {
    this.RouterPage.navigate(['/' , `${Singleton.RoutingPage.Files}` , `${GroupID}`]);
  }

  public Route2MainPage() {
    this.RouterPage.navigate(['/' , `${Singleton.RoutingPage.Groups.PublicG}`]);
  }

  public CurrentURl() {
    return this.RouterPage.url.split('/')
  }

  public RefreshPage() {
    location.reload();
  }

  public GetUrlTree(Commands : string[]) {
    return this.RouterPage.createUrlTree(Commands) ;
  }

}
