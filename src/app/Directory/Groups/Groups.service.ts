import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Singleton} from "../../Models/Singleton";
import {catchError, map} from "rxjs";
import {AdapterService} from "../../Adapter/Adapter.service";
import {AuthenticationService} from "../../Authentication/Authentication.service";
import {Person} from "../../Models/Person";
import {Group} from "../../Models/GroupsHandle";


export interface GroupResponse {
  id : number ;
  owner : {
    id : number ,
    name : string
  } ; //Not Back
  name : string ;
  type : string ;
  updated_at : string ;
  created_at : string ;
}

interface GroupsResponse {
  data : {
    group ?: GroupResponse ,
    groups ?: GroupResponse[] ,
  }
}

@Injectable({providedIn : 'root'})
export class GroupsService {

  AccountUser !: Person ;

  constructor(private Request : HttpClient ,
              private AuthenticationProcess : AuthenticationService ,
              private AdapterProcess : AdapterService) {
    this.AccountUser = this.AuthenticationProcess.AccountSnapshot() as Person ;
  }

  public CreateGroup(Name : string) {
    return this.Request.post<GroupsResponse>(`${Singleton.API}api/filemanagement/group/create` , {
      name : Name ,
      type : `private`
    }
    , { headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(map(Response => {
        if(Response.data.group)
          return this.AdapterProcess.Convert2Group(Response.data.group) ;
        return null ;
      }) ,
        catchError(ErrorResponse => {
          throw '' ;
        }));
  }

  public DeleteGroup(GroupID : number) {
    return this.Request.delete(`${Singleton.API}api/filemanagement/group/delete` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken() }) ,
      body : {
        id_group : GroupID
      }
    })
      .pipe(catchError(ErrorValue => {
      throw '' ;
    }));
  }

  public ShowMyGroups() {
    return this.Request.get<GroupsResponse>(`${Singleton.API}api/filemanagement/group/all` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(map(Response => {
      const GroupsValue : Group[] = [] ;
      if(Response.data.groups)
        Response.data.groups.forEach(Value =>
          GroupsValue.push(this.AdapterProcess.Convert2Group(Value))
        );
      return GroupsValue ;
    }) , catchError(ErrorValue => {
      throw '' ;
    }));
  }

  public ShowIncludeGroups() {

  }

}
