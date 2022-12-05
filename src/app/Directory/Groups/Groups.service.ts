import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Singleton} from "../../Models/Singleton";
import {catchError, map} from "rxjs";
import {AdapterService} from "../../Adapter/Adapter.service";
import {AuthenticationService} from "../../Authentication/Authentication.service";
import {Person} from "../../Models/Person";
import {Group} from "../../Models/GroupsHandle";
import {FileResponse, FilesService} from "../Files/Files.service";
import {Files} from "../../Models/FilesHandle";
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
    group ?: GroupResponse ,
    groups ?: GroupResponse[] ,
  }
}

@Injectable({providedIn : 'root'})
export class GroupsService {

  AccountUser !: Person ;

  constructor(private Request : HttpClient ,
              private AuthenticationProcess : AuthenticationService ,
              private AdapterProcess : AdapterService ,
              private PermissionProcess : PermissionService ,
              private FilesProcess : FilesService) {
    this.AuthenticationProcess.ListenAccount().subscribe(Value => {
      if(Value != null)
        this.AccountUser = Value ;
    }) ;
  }

  public CreateGroup(Name : string) {
    return this.Request.post<GroupsResponse>(`${Singleton.API}api/filemanagement/group/create` , {
      name : Name ,
      type : 'private'
    } , { headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(map(Response => {
        if(Response.data.group) {
          Response.data.group.user = {
            id : this.AccountUser.ID ,
            name : this.AccountUser.Name
          } ;
          return this.AdapterProcess.Convert2Group(Response.data.group) ;
        }
        return null ;
      }) , catchError((ErrorResponse : HttpErrorResponse) => {
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
          GroupsValue.push(this.ConfigureData(Value));
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
          Value.user = {
            id : 1 , //Temp
            name : 'Amir' //Temp
          }
          GroupsValue.push(this.ConfigureData(Value)) ;
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
          Response.data.groups.forEach(Value => GroupArray.push(this.ConfigureData(Value)));
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
      if(ResponseValue.data.group) {
        let GroupFiles : Files[] = [] ;
        let MainGroup = this.ConfigureData(ResponseValue.data.group) ;
        ResponseValue.data.group.files.forEach(Value =>
          GroupFiles.push(this.FilesProcess.ConfigureData(Value , MainGroup)));
        return {
          GroupObject : MainGroup ,
          GroupFiles : GroupFiles
        } ;
      }
      return null ;
    }) , catchError((ErrorResponse : HttpErrorResponse) => {
      throw ErrorResponse.error ;
    }));
  }

  public ConfigureData(APIGroup : GroupResponse) {
    const GroupItem = this.AdapterProcess.Convert2Group(APIGroup) ;
    this.PermissionProcess.GrantGroupPermission(GroupItem) ;
    return GroupItem
  }
}
