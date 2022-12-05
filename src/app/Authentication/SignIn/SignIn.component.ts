import {Component} from "@angular/core";
import {AuthenticationService} from "../Authentication.service";
import {AbstractControl, NgForm} from "@angular/forms";
import {ErrorHandlerManual, FactoryErrors} from "../../Models/ErrorHandler";
import {Singleton} from "../../Models/Singleton";
import {RoutingProcessService} from "../../Routing/RoutingProcess.service";
import {LoaderService} from "../../Component/Loader/Loader.service";

@Component({
  templateUrl : `./SignIn.html`,
  styleUrls : [`../Authentication.css`]
})
export class SignInComponent {

  ErrorView : ErrorHandlerManual ;

  constructor(public AuthenticationProcess : AuthenticationService ,
              public ProcessRouting : RoutingProcessService ,
              private LoadingProcess : LoaderService) {
    this.ErrorView = FactoryErrors.GetErrorObject({
      Authentication : true
    }) ;
  }

  public OnSubmit(InfoForm : NgForm) {
    this.LoadingProcess.ActiveTask() ;
    this.ErrorView.ErrorOccur.Error_Render = false ;
    if(InfoForm.form.invalid) {
      this.ErrorView.Error_Form(InfoForm.form) ;
      this.LoadingProcess.DoneTask() ;
      return ;
    }
    this.AuthenticationProcess.SignIn({
      Email : (InfoForm.form.get(Singleton.FormName.Email) as  AbstractControl).value ,
      Password : (InfoForm.form.get(Singleton.FormName.Password) as  AbstractControl).value ,
    } , Boolean(InfoForm.form.get(Singleton.FormName.SaveLogin)?.value))
      .subscribe(Value => {
        this.LoadingProcess.DoneTask() ;
        this.ProcessRouting.Route2MainPage();
      } , ErrorValue => {
        this.ErrorView.Error_Server(ErrorValue) ;
        this.LoadingProcess.DoneTask() ;
    });
  }

  public GetSingleton() {
    return Singleton ;
  }
}
