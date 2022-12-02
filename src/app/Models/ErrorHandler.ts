import {FormGroup} from "@angular/forms";
import {Singleton} from "./Singleton";

// Factory Method Pattern

export abstract class ErrorHandlerManual {

  ErrorOccur = {
    Error_Render : false ,
    Error_Position : ErrorsType.UnKnown ,
    Error_Message : '' ,
  } ;

  abstract Error_Form(InformationForm : FormGroup) : void ;

  abstract Error_Server(ErrorMessage : string) : void ;

  ErrorType() {
    return ErrorsType
  }
}

export class FactoryErrors {

  public static GetErrorObject(Message : {
    Authentication ?:  boolean ,
  }) : ErrorHandlerManual {
    if(Message.Authentication)
      return new AuthenticationError() ;
    return new UnKnownError() ;
  }

  public static GetErrorsType() {
    return ErrorsType
  }
}

export class AuthenticationError extends ErrorHandlerManual {

  Error_Form(InformationForm : FormGroup) {
    if(InformationForm.get(Singleton.FormName.FirstName) &&
      InformationForm.get(Singleton.FormName.FirstName)?.invalid) {
      this.ErrorOccur.Error_Position = ErrorsType.FirstName ;
      this.ErrorOccur.Error_Message = 'The First Name Is Invalid' ;
    }
    else if(InformationForm.get(Singleton.FormName.LastName) &&
      InformationForm.get(Singleton.FormName.LastName)?.invalid) {
      this.ErrorOccur.Error_Position = ErrorsType.LastName ;
      this.ErrorOccur.Error_Message = 'The Last Name Is Invalid' ;
    }
    else if(InformationForm.get(Singleton.FormName.Email) &&
      InformationForm.get(Singleton.FormName.Email)?.invalid) {
      this.ErrorOccur.Error_Position = ErrorsType.Email ;
      this.ErrorOccur.Error_Message = 'The Email Is Invalid' ;
    }
    else if(InformationForm.get(Singleton.FormName.Password) &&
      InformationForm.get(Singleton.FormName.Password)?.invalid) {
      this.ErrorOccur.Error_Position = ErrorsType.Password ;
      this.ErrorOccur.Error_Message = 'The Password Is Invalid' ;
    }
    else if(InformationForm.get(Singleton.FormName.Role) &&
      InformationForm.get(Singleton.FormName.Role)?.invalid) {
      this.ErrorOccur.Error_Position = ErrorsType.Role ;
      this.ErrorOccur.Error_Message = 'The PersonType Is not Determine' ;
    }
    else {
      this.ErrorOccur.Error_Position = ErrorsType.UnKnown ;
      this.ErrorOccur.Error_Message = 'This Error Is Undefined' ;
    }
    console.log(this.ErrorOccur);
    this.ErrorOccur.Error_Render = true ;
  }

  Error_Server(ErrorMessage : string) {
    this.ErrorOccur.Error_Position = ErrorsType.UnKnown ;
    this.ErrorOccur.Error_Message = 'This Error Is Undefined' ;
    this.ErrorOccur.Error_Render = true ;
  }

}

export class UnKnownError extends ErrorHandlerManual {

  Error_Form(InformationForm: FormGroup) {
    this.ErrorOccur.Error_Position = ErrorsType.UnKnown ;
    this.ErrorOccur.Error_Message = 'This Error Is Undefined' ;
    this.ErrorOccur.Error_Render = true ;
  }

  Error_Server(ErrorMessage: string) {
    this.ErrorOccur.Error_Position = ErrorsType.UnKnown;
    this.ErrorOccur.Error_Message = 'This Error Is Undefined';
    this.ErrorOccur.Error_Render = true;
  }

}

enum ErrorsType {
  FirstName ,
  LastName,
  Email ,
  Password ,
  Role ,
  UnKnown
}
