import {Injectable} from "@angular/core";
import {Person} from "../../Models/Person";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../../Authentication/Authentication.service";
import {AdapterService} from "../../Adapter/Adapter.service";
import {Singleton} from "../../Models/Singleton";
import {catchError, map} from "rxjs";
import {Files} from "../../Models/FilesHandle";


export interface FileResponse {
  id : number ,
  id_user : number ,
  name : string ,
  path : string ,
  updated_at : string ,
  created_at : string ,
  user_bookings ?: {
    id : number ,
    name : string
  } ;
}

interface FilesResponse {
  data : {
    files ?: FileResponse[] ,
    file ?: FileResponse
  }
}

@Injectable({providedIn : 'root'})
export class FilesService {

  AccountUser !: Person ;

  constructor(private Request : HttpClient ,
              private AuthenticationProcess : AuthenticationService ,
              private AdapterProcess : AdapterService) {
    this.AccountUser = this.AuthenticationProcess.AccountSnapshot() as Person ;
  }

  public CreateFile(ObjectFile : FormData , NameFile : string , GroupID : number) {
    return this.Request.post<FilesResponse>(`${Singleton.API}api/filemanagement/file`
      , {
      file : ObjectFile ,
      name : NameFile ,
      id_group : GroupID
    } , { headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(map(Response => {
        if(Response.data.file)
          return this.AdapterProcess.Convert2File(Response.data.file);
        return null ;
      }) ,
      catchError(ErrorValue => {
      throw '' ;
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

  public ShowFiles(GroupID : number) {
    return this.Request.get<FilesResponse>(`${Singleton.API}api/filemanagement/group/files/show` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(map(Response => {
      const FilesValue : Files[] = [] ;
      if(Response.data.files)
        Response.data.files.forEach(Value => {
          FilesValue.push(this.AdapterProcess.Convert2File(Value));
        });
      return FilesValue ;
    }) , catchError(ErrorValue => {
      throw '' ;
    }));
  }

}
