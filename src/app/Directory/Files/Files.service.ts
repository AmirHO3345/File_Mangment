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
    return this.Request.get<FilesResponse>(`${Singleton.API}api/filemanagement/file/show` , {
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
