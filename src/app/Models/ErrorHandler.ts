import {FormGroup} from "@angular/forms";
import {Singleton} from "./Singleton";

interface ErrorAPI {
  errors : {
    Validation ?: {
      password ?: string[] ,
      email ?: string[] ,
      name ?: string[] ,
      id_file ?: string[]
    } ,
    Access ?: string ,
    group ?: string ,
    file ?: string
  } ;
}

// Factory Method Pattern

export abstract class ErrorHandlerManual {

  ErrorOccur = {
    Error_Render : false ,
    Error_Position : ErrorsType.UnKnown ,
    Error_Message : '' ,
  } ;

  Error_Front(InformationError : {}) : void {
    this.ConfigureErrorHandle(ErrorsType.UnKnown
      , 'This Error Is Undefined' , true) ;
  }

  Error_Server(ErrorMessage : {}) : void {
    this.ConfigureErrorHandle(ErrorsType.UnKnown
      , 'This Error Is Undefined' , true) ;
  }

  ErrorType() {
    return ErrorsType
  }

  protected ConfigureErrorHandle( TypeWant : ErrorsType , Message : string ,
                                  RenderWant : boolean) {
    this.ErrorOccur.Error_Position = TypeWant ;
    this.ErrorOccur.Error_Message = Message ;
    this.ErrorOccur.Error_Render = RenderWant ;
  }

}

export class FactoryErrors {

  public static GetErrorObject(Message : {
    Authentication ?:  boolean ,
    NewCreate ?: boolean ,
    Groups ?: boolean ,
    Files ?: boolean ,
    Report ?: boolean
  }) : ErrorHandlerManual {
    if(Message.Authentication)
      return new AuthenticationError() ;
    if(Message.NewCreate)
      return new NewCreateError() ;
    if(Message.Files)
      return new FilesError() ;
    if(Message.Groups)
      return new GroupsError() ;
    if(Message.Report)
      return new ReportError() ;
    return new UnKnownError() ;
  }

  public static GetErrorsType() {
    return ErrorsType
  }
}

export class AuthenticationError extends ErrorHandlerManual {

  override Error_Front(InformationError : {}) {
    const InformationForm = InformationError as FormGroup ;
    if(InformationForm.get(Singleton.FormName.FirstName) &&
      InformationForm.get(Singleton.FormName.FirstName)?.invalid) {
      this.ConfigureErrorHandle(ErrorsType.FirstName
        , 'The First Name Is Invalid' , true) ;
    }
    else if(InformationForm.get(Singleton.FormName.LastName) &&
      InformationForm.get(Singleton.FormName.LastName)?.invalid) {
      this.ConfigureErrorHandle(ErrorsType.LastName
        , 'The Last Name Is Invalid' , true) ;
    }
    else if(InformationForm.get(Singleton.FormName.Email) &&
      InformationForm.get(Singleton.FormName.Email)?.invalid) {
      this.ConfigureErrorHandle(ErrorsType.Email
        , 'The Email Is Invalid' , true) ;
    }
    else if(InformationForm.get(Singleton.FormName.Password) &&
      InformationForm.get(Singleton.FormName.Password)?.invalid) {
      this.ConfigureErrorHandle(ErrorsType.Password
        , 'The Password Is Invalid' , true) ;
    }
    else {
      this.ConfigureErrorHandle(ErrorsType.UnKnown
        , 'This Error Is Undefined' , true) ;
    }
  }

  override Error_Server(ErrorMessage : {}) {
    const ActuallyMessage = ErrorMessage as ErrorAPI ;
    if(ActuallyMessage.errors.Validation) {
      if(ActuallyMessage.errors.Validation.email) {
        this.ConfigureErrorHandle(ErrorsType.Email
          , ActuallyMessage.errors.Validation.email[0] , true) ;
      } else if(ActuallyMessage.errors.Validation.password) {
        this.ConfigureErrorHandle(ErrorsType.Password
          , ActuallyMessage.errors.Validation.password[0] , true) ;
      } else if(ActuallyMessage.errors.Validation.name) {
        this.ConfigureErrorHandle(ErrorsType.FullName
          , ActuallyMessage.errors.Validation.name[0] , true) ;
      } else {
        this.ConfigureErrorHandle(ErrorsType.UnKnown
          , 'This Error Is Undefined' , true) ;
      }
    }
    else {
      this.ConfigureErrorHandle(ErrorsType.UnKnown
        , 'This Error Is Undefined' , true) ;
    }
  }

}

export class NewCreateError extends ErrorHandlerManual {

  override Error_Server(ErrorMessage: {}): void {
  }

}

export class GroupsError extends ErrorHandlerManual {

  override Error_Server(ErrorMessage: {}): void {
    const ActuallyMessage = ErrorMessage as ErrorAPI ;
    if(ActuallyMessage.errors.Access) {
      this.ConfigureErrorHandle(ErrorsType.Permission
        , ActuallyMessage.errors.Access , true) ;
    } else if(ActuallyMessage.errors.group) {
      this.ConfigureErrorHandle(ErrorsType.Group
        , ActuallyMessage.errors.group , true) ;
    } else {
      this.ConfigureErrorHandle(ErrorsType.UnKnown
        , 'This Error Is Undefined' , true) ;
    }
  }

}

export class FilesError extends ErrorHandlerManual {

  override Error_Server(ErrorMessage: {}): void {
    const ActuallyMessage = ErrorMessage as ErrorAPI ;
    if(ActuallyMessage.errors.Access) {
      this.ConfigureErrorHandle(ErrorsType.Permission
        , ActuallyMessage.errors.Access , true) ;
    } else if(ActuallyMessage.errors.file) {
      this.ConfigureErrorHandle(ErrorsType.File
        , ActuallyMessage.errors.file , true) ;
    } else {
      this.ConfigureErrorHandle(ErrorsType.UnKnown
        , 'This Error Is Undefined' , true) ;
    }
  }

}

export class ReportError extends ErrorHandlerManual {

  override Error_Server(ErrorMessage: {}): void {
    const ActuallyMessage = ErrorMessage as ErrorAPI ;
    if(ActuallyMessage.errors.Validation) {
      if(ActuallyMessage.errors.Validation.id_file) {
        this.ConfigureErrorHandle(ErrorsType.ReportRoute ,
          ActuallyMessage.errors.Validation.id_file[0] , true) ;
      } else {
        this.ConfigureErrorHandle(ErrorsType.UnKnown
          , 'This Error Is Undefined' , true) ;
      }
    } else {
      this.ConfigureErrorHandle(ErrorsType.UnKnown
        , 'This Error Is Undefined' , true) ;
    }
  }

}

export class UnKnownError extends ErrorHandlerManual {

  override Error_Server(ErrorMessage: {}) {
    this.ConfigureErrorHandle(ErrorsType.UnKnown
      , 'This Error Is Undefined' , true) ;
  }

}

enum ErrorsType {
  FirstName ,
  LastName,
  Email ,
  Password ,
  FullName ,
  Permission ,
  Group ,
  File ,
  ReportRoute ,
  UnKnown
}
