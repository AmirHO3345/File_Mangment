import {Component} from "@angular/core";
import {AbstractControl, NgForm} from "@angular/forms";
import {AuthenticationService} from "../Authentication.service";
import {ErrorHandlerManual, FactoryErrors} from "../../Models/ErrorHandler";
import {Singleton} from "../../Models/Singleton";
import {RoutingProcessService} from "../../Routing/RoutingProcess.service";

@Component({
  templateUrl : `./Register.html` ,
  styleUrls : [`../Authentication.css`]
})
export class RegisterComponent {

  ErrorView : ErrorHandlerManual ;

  constructor(public AuthenticationProcess : AuthenticationService ,
              public ProcessRouting : RoutingProcessService) {
    this.ErrorView = FactoryErrors.GetErrorObject({
      Authentication : true
    }) ;
  }

  public GetSingleton() {
    return Singleton ;
  }

  public OnSubmit(InfoForm : NgForm) {
    this.ErrorView.ErrorOccur.Error_Render = false ;
    if(InfoForm.form.invalid) {
      this.ErrorView.Error_Form(InfoForm.form)
      return ;
    }
    const Name : string = `${(InfoForm.form.get(Singleton.FormName.FirstName) as  AbstractControl).value} ${(InfoForm.
    form.get(Singleton.FormName.LastName) as  AbstractControl).value}` ;
    const Role : string = ((InfoForm.form.get(Singleton.FormName.Role) as  AbstractControl).value == 'User')?
      'user' : 'admin'
    this.AuthenticationProcess.SignUp({
      Email : (InfoForm.form.get(Singleton.FormName.Email) as  AbstractControl).value ,
      Name : Name ,
      Password : (InfoForm.form.get(Singleton.FormName.Password) as  AbstractControl).value ,
      Role : Role
    }).subscribe(Value => {
      this.ProcessRouting.Route2MainPage();
    } , ErrorValue => {
      this.ErrorView.Error_Server(ErrorValue) ;
    });
  }
}
