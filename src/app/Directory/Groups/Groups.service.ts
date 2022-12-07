import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Singleton} from "../../Models/Singleton";
import {catchError, map} from "rxjs";
import {AdapterService} from "../../Adapter/Adapter.service";
import {AuthenticationService} from "../../Authentication/Authentication.service";
import {Person} from "../../Models/Person";
import {Group} from "../../Models/GroupsHandle";
import {FileResponse} from "../Files/Files.service";
import {PermissionService} from "../../Permission/Permission.service";


export interface GroupResponse {
  id : number ;
  name: string ;
  type: string ;
  created_at: string ;
  updated_at: string ;
  user : {
    id: number ,
    name: string
  } ;
  files : FileResponse[] ;
}

interface GroupsResponse {
  data : {
    group : GroupResponse ,
    groups : GroupResponse[] ,
  }
}

@Injectable({providedIn : 'root'})
export class GroupsService {

  AccountUser !: Person ;

  constructor(private Request : HttpClient ,
              private AuthenticationProcess : AuthenticationService ,
              private AdapterProcess : AdapterService ,
              private PermissionProcess : PermissionService) {
    this.AuthenticationProcess.ListenAccount().subscribe(Value => {
      if(Value != null)
        this.AccountUser = Value ;
    }) ;
  }

  public CreateGroup(Name : string) {
    return this.Request.post(`${Singleton.API}api/filemanagement/group/create` , {
      name : Name ,
      type : 'private'
    } , { headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(catchError((ErrorResponse : HttpErrorResponse) => {
      throw ErrorResponse.error ;
    }));
  }

  public DeleteGroup(GroupID : number) {
    return this.Request.delete(`${Singleton.API}api/filemanagement/group/delete` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken() }) ,
      body : {
        id_group : GroupID
      }
    }).pipe(catchError((ErrorResponse : HttpErrorResponse) => {
      throw ErrorResponse.error ;
    }));
  }

  public ShowOwnerGroups() {
    return this.Request.get<GroupsResponse>(`${Singleton.API}api/filemanagement/group/show` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(map(Response => {
      const GroupsValue : Group[] = [] ;
      if(Response.data.groups)
        Response.data.groups.forEach(Value => {
          Value.user = {
            id : this.AccountUser.ID ,
            name : this.AccountUser.Name
          } ;
          GroupsValue.push(this.ConfigureData(Value).Group) ;
        });
      return GroupsValue ;
    }) , catchError((ErrorResponse : HttpErrorResponse) => {
      throw ErrorResponse.error ;
    }));
  }

  public ShowIncludeGroups() {
    return this.Request.get<GroupsResponse>(`${Singleton.API}api/filemanagement/group/my-in` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(map(Response => {
      const GroupsValue : Group[] = [] ;
      if(Response.data.groups)
        Response.data.groups.forEach(Value => {
          GroupsValue.push(this.ConfigureData(Value).Group)
        });
      return GroupsValue ;
    }) , catchError((ErrorResponse : HttpErrorResponse) => {
      throw ErrorResponse.error ;
    }));
  }

  public GetAllGroups() {
    return this.Request.get<GroupsResponse>(`${Singleton.API}api/filemanagement/group/access` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(map(Response => {
        const GroupArray : Group[] = [] ;
        if(Response.data.groups)
          Response.data.groups.forEach(Value => {
            GroupArray.push(this.ConfigureData(Value).Group)
          });
        return GroupArray ;
      }) , catchError((ErrorResponse : HttpErrorResponse) => {
      throw ErrorResponse.error ;
    }));
  }

  public GetGroupWithFile(GroupID : number) {
    return this.Request.get<GroupsResponse>(`${Singleton.API}api/filemanagement/group/files/show` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()}) ,
      params : new HttpParams().set('id_group' , GroupID)
    }).pipe(map(ResponseValue => {
      const MainGroup = this.ConfigureData(ResponseValue.data.group) ;
      return {
        GroupObject : MainGroup.Group ,
        GroupFiles : MainGroup.File
      } ;
    }) , catchError((ErrorResponse : HttpErrorResponse) => {
      throw ErrorResponse.error ;
    }));
  }

  private ConfigureData(APIGroup : GroupResponse) {
    const GroupValue = this.AdapterProcess.Convert2Group(APIGroup) ;
    const FileValue = (APIGroup.files)? APIGroup.files : undefined ;
    this.PermissionProcess.GrantGroupPermission(GroupValue) ;
    return {
      Group : GroupValue ,
      File : FileValue
    } ;
  }

}
