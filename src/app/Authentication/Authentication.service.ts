import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map} from "rxjs";
import {Person} from "../Models/Person";
import {Singleton} from "../Models/Singleton";
import {AdapterService, PersonResponse} from "../Adapter/Adapter.service";

@Injectable({providedIn : 'root'})
export class AuthenticationService {

  private readonly Account : BehaviorSubject<Person | null> ;

  private readonly ReferenceStorage : string ;

  constructor(private Request : HttpClient ,
              private AdapterProcess : AdapterService) {
    this.Account = new BehaviorSubject<Person | null>(null);
    this.ReferenceStorage = 'DataPerson' ;
  }

  public SignIn(Message : {
    Email : string ,
    Password : string
  } , KeepLogin = false) {
    return this.Request.post<PersonResponse>(`${Singleton.API}api/filemanagement/auth/login` , {
      'email' : Message.Email ,
      'password' : Message.Password
    }).pipe(map(Response => {
      this.Account.next(this.AdapterProcess.Convert2Account(Response));
      if(KeepLogin)
        this.SaveData() ;
    }) , catchError((ErrorResponse : HttpErrorResponse) => {
      throw ErrorResponse.error
    }));
  }

  public SignUp(Message : {
    Name : string ,
    Email : string ,
    Password : string ,
    Role : string
  }) {
    return this.Request.post<PersonResponse>(`${Singleton.API}api/filemanagement/auth/register` , {
      'name' : Message.Name ,
      'email' : Message.Email ,
      'password' : Message.Password ,
      'role' : Message.Role
    }).pipe(map(Response => {
      this.Account.next(this.AdapterProcess.Convert2Account(Response));
    }) , catchError((ErrorResponse : HttpErrorResponse) => {
      throw ErrorResponse.error ;
    }));
  }

  public AutoLogin() {
    const DataJson : string | null = localStorage.getItem(this.ReferenceStorage);
    if(DataJson)
      return this.GetDataAuthentication(DataJson).pipe(map(Value => {
        this.Account.next(Value) ;
        return true ;
      }));
    return false ;
  }

  public SignOut() {
    return this.Request.delete(`${Singleton.API}api/filemanagement/auth/logout` , {
      headers : new HttpHeaders({"Authorization" : `${this.Account.getValue()?.getToken()}`})})
      .pipe(map(() => {
        this.Account.next(null) ;
        localStorage.removeItem(this.ReferenceStorage) ;
        return true ;
      }));
  }

  public ListenAccount() {
    return this.Account.asObservable() ;
  }

  public AccountSnapshot() {
    return this.Account.getValue();
  }

  private SaveData() {
    const Token = this.AccountSnapshot()?.getToken() ;
    if(Token)
      localStorage.setItem(this.ReferenceStorage , Token);
  }

  private GetDataAuthentication(Token : string) {
    return this.Request.get<PersonResponse>(`${Singleton.API}api/filemanagement/auth/user` , {
      headers : new HttpHeaders({"Authorization" : `${Token}`})})
      .pipe(map(Response => {
        const CurrentAccount = this.AdapterProcess.Convert2Account(Response) ;
        CurrentAccount.setToken(Token);
        return CurrentAccount ;
      }) , catchError((ErrorResponse : HttpErrorResponse) => {
        throw ErrorResponse.error ;
      }));
  }

}

export enum ErrorType{
  Email ,
  Password ,
  First_Name ,
  Last_Name ,
  Role ,
}
