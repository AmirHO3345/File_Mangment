import {Injectable} from "@angular/core";
import {Person} from "../../Models/Person";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthenticationService} from "../../Authentication/Authentication.service";
import {AdapterService} from "../../Adapter/Adapter.service";
import {Singleton} from "../../Models/Singleton";
import {catchError, map} from "rxjs";
import {Files} from "../../Models/FilesHandle";
import {Group} from "../../Models/GroupsHandle";
import {PermissionService} from "../../Permission/Permission.service";


export interface FileResponse {
  id : number ;
  name : string ;
  path : string ;
  updated_at : string ;
  created_at : string ;
  user : {
    id : number ,
    name : string
  } ;
  user_bookings : {
    id : number ,
    name : string
  }[] ;
}

interface FilesResponse {
  data : {
    file ?: FileResponse ,
    group ?: {
      files : FileResponse[]
    }
  }
}

@Injectable({providedIn : 'root'})
export class FilesService {

  AccountUser !: Person ;

  constructor(private Request : HttpClient ,
              private AuthenticationProcess : AuthenticationService ,
              private AdapterProcess : AdapterService ,
              private PermissionService : PermissionService) {
    this.AuthenticationProcess.ListenAccount().subscribe(Value => {
      if(Value != null)
        this.AccountUser = Value ;
    });
  }

  public CreateFile(ObjectFile : File , NameFile : string , GroupID : number) {
    const FormFile = new FormData() ;
    FormFile.append('file' , ObjectFile , ObjectFile.name) ;
    FormFile.append('name' , NameFile) ;
    FormFile.append('id_group' , GroupID.toString()) ;
    return this.Request.post<FilesResponse>(`${Singleton.API}api/filemanagement/file/create` ,
      FormFile , { headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(map(Response => {
        if(Response.data.file) {
          Response.data.file.user = {
            id : this.AccountUser.ID ,
            name : this.AccountUser.Name
          } ;
          return this.AdapterProcess.Convert2File(Response.data.file);
        }
        return null ;
      })) ;
  }

  public DeleteFile(FileID : number) {
    return this.Request.delete(`${Singleton.API}api/filemanagement/file/delete`
      ,{
        headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()}) ,
        body : {
          id_file : FileID
        }
      }).pipe(catchError(ErrorValue => {
        throw '' ;
      })) ;
  }

  public GetPrivateGroupFile(GroupItem : Group) {
    return this.Request.get<FilesResponse>(`${Singleton.API}api/filemanagement/group/files/show` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()}) ,
      params : new HttpParams().set('id_group' , GroupItem.ID)
    }).pipe(map(Response => {
      const FilesValue : Files[] = [] ;
      if(Response.data.group)
        Response.data.group.files.forEach(Value =>
          FilesValue.push(this.ConfigureData(Value , GroupItem))) ;
      return FilesValue ;
    }) , catchError(ErrorValue => {
      throw '' ;
    }));
  }

  public GetGlobalGroupFile() {
    return this.Request.get<FilesResponse>(`${Singleton.API}api/filemanagement/group/files/show` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()}) ,
      params : new HttpParams().set('id_group' , 1)
    }).pipe(map(Response => {
      const FilesValue : Files[] = [] ;
      if(Response.data.group)
        Response.data.group.files.forEach(Value => {
          FilesValue.push(this.ConfigureData(Value))
        }) ;
      return FilesValue ;
    }) , catchError(ErrorValue => {
      throw '' ;
    }));
  }

  public ReserveFile(FilesID : number[]) {
    return this.Request.post(`${Singleton.API}api/filemanagement/file/booking/check/in` , {
      ids : FilesID
    } , {headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})});
  }

  public UnReserveFile(FileID : number) {
    return this.Request.delete(`${Singleton.API}api/filemanagement/file/booking/check/out` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()}) ,
      body : {
        id_file : FileID
      }
    });
  }

  public ConfigureData(APIFile : FileResponse , GroupInfo ?: Group) {
    const File_Item = this.AdapterProcess.Convert2File(APIFile) ;
    if(GroupInfo)
      this.PermissionService.GrantPrivateFilePermission(GroupInfo , File_Item) ;
    else
      this.PermissionService.GrantGlobalFilePermission(File_Item) ;
    return File_Item ;
  }

}
