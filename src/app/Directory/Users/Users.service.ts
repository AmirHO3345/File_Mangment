import {Injectable} from "@angular/core";
import {Person, User} from "../../Models/Person";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../../Authentication/Authentication.service";
import {Singleton} from "../../Models/Singleton";
import {catchError, map} from "rxjs";
import {AdapterService} from "../../Adapter/Adapter.service";
import {GroupsService} from "../Groups/Groups.service";
import {Group} from "../../Models/GroupsHandle";
import {PermissionService} from "../../Permission/Permission.service";

export interface UserResponse {
  id : number ;
  name: string ;
  email: string ;
  role: string ;
  created_at: string ;
  updated_at: string ;
}

interface UsersResponse {
  data : {
    users : UserResponse[]
  } ;
}

@Injectable({providedIn : "root"})
export class UsersService {

  AccountUser !: Person ;

  constructor(private Request : HttpClient ,
              private AuthenticationProcess : AuthenticationService ,
              private GroupProcess : GroupsService ,
              private AdapterProcess : AdapterService ,
              private PermissionProcess : PermissionService ) {
    this.StartService() ;
  }

  private StartService() {
    this.AccountUser = this.AuthenticationProcess.AccountSnapshot() as Person ;
  }

  public GetAllUsers() {
    return this.Request.get<UsersResponse>(`${Singleton.API}api/filemanagement/auth/users`
      , {headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})})
      .pipe(map(Response => {
        const UsersResult : User[] = [] ;
        Response.data.users.forEach(Value =>
          UsersResult.push(this.ConfigureData({APIUser : Value}))
        );
        return UsersResult ;
      }) , catchError((ErrorValue : HttpErrorResponse) => {
        throw ErrorValue.error
      }));
  }

  public GetPrivateGroupUser(GroupItem : number) {
    return this.GroupProcess.GetGroupWithUser(GroupItem).pipe(map(ServiceValue => {
      const UsersArray : User[] = [] ;
      if(ServiceValue.GroupUsers) {
        ServiceValue.GroupUsers.forEach(Value =>
          UsersArray.push(this.ConfigureData(
            {APIUser : Value , GroupUser : ServiceValue.GroupObject})));
      }
      return {
        GroupObject : ServiceValue.GroupObject ,
        GroupUsers : UsersArray
      } ;
    }) , catchError(ErrorValue => {
      throw ErrorValue ;
    }));
  }

  public JoinUser(GroupID : number , UsersID : number) {
    return this.Request.post<void>(`${Singleton.API}api/filemanagement/group/users/add` , {
      id_group : GroupID ,
      ids_user : [UsersID]
    } , {headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})})
      .pipe(catchError((ErrorValue : HttpErrorResponse) => {
        throw ErrorValue.error ;
      }));
  }

  public OutUser(GroupID : number , UsersID : number[]) {
    return this.Request.delete<void>(`${Singleton.API}api/filemanagement/group/users/delete` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()}) ,
      body : {
        id_group : GroupID ,
        ids_user : UsersID
      }
    }).pipe(catchError((ErrorValue : HttpErrorResponse) => {
      throw ErrorValue.error ;
    }));
  }

  private ConfigureData(FileData : {
    APIUser : UserResponse ,
    GroupUser ?: Group
  }) {
    const UserValue = this.AdapterProcess.Convert2User(FileData.APIUser) ;
    if(FileData.GroupUser)
      this.PermissionProcess.GrantPrivateUserPermission(FileData.GroupUser ,
        UserValue) ;
    else
      this.PermissionProcess.GrantGlobalUserPermission(UserValue) ;
    return UserValue ;
  }

}
