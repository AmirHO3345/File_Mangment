import {Injectable} from "@angular/core";
import {Person} from "../../Models/Person";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthenticationService} from "../../Authentication/Authentication.service";
import {AdapterService} from "../../Adapter/Adapter.service";
import {Singleton} from "../../Models/Singleton";
import {catchError, map, take} from "rxjs";
import {GroupsService} from "../Groups/Groups.service";
import {Group} from "../../Models/GroupsHandle";
import {PermissionService} from "../../Permission/Permission.service";
import {Files} from "../../Models/FilesHandle";


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
  report : ReportResponse[] ;
}

export interface ReportResponse {
  id_user_booking : number ;
  name_user_booking : string ;
  booking_date: string ;
  unbooking_date: string ;
}

interface FilesResponse {
  data : {
    file : FileResponse ,
    files : FileResponse[]
  }
}

@Injectable({providedIn : 'root'})
export class FilesService {

  AccountUser !: Person ;

  constructor(private Request : HttpClient ,
              private AuthenticationProcess : AuthenticationService ,
              private AdapterProcess : AdapterService ,
              private GroupProcess : GroupsService ,
              private PermissionProcess : PermissionService) {
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
    return this.Request.post(`${Singleton.API}api/filemanagement/file/create` ,
      FormFile , { headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(catchError((ErrorResponse : HttpErrorResponse) => {
      throw ErrorResponse.error ;
    })) ;
  }

  public DeleteFile(FileID : number) {
    return this.Request.delete(`${Singleton.API}api/filemanagement/file/delete`
      ,{
        headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()}) ,
        body : {
          id_file : FileID
        }
      }).pipe(catchError((ErrorResponse : HttpErrorResponse) => {
      throw ErrorResponse.error ;
    })) ;
  }

  public GetPrivateGroupFile(GroupItem : number) {
    return this.GroupProcess.GetGroupWithFile(GroupItem).pipe(map(ServiceValue => {
        const FilesArray : Files[] = [] ;
        if(ServiceValue.GroupFiles) {
          ServiceValue.GroupFiles.forEach(Value => FilesArray.push(this.ConfigureData({
            APIFile : Value ,
            GroupFile : ServiceValue.GroupObject
          }))) ;
        }
        return {
          GroupObject : ServiceValue.GroupObject ,
          GroupFiles : FilesArray
        } ;
    }) , catchError((ErrorValue : HttpErrorResponse) => {
      throw ErrorValue.error
    })) ;
  }

  public GetGlobalGroupFile() {
    return this.GetPrivateGroupFile(Singleton.GlobalGroupID).pipe(map(ValeResponse => {
      return ValeResponse.GroupFiles ;
    }) , catchError(ErrorValue => {
      throw ErrorValue ;
    }));
  }

  public ReserveFile(FilesID : number[]) {
    return this.Request.post(`${Singleton.API}api/filemanagement/file/booking/check/in` , {
      ids : FilesID
    } , {headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})})
      .pipe(catchError((ErrorResponse : HttpErrorResponse) => {
        throw ErrorResponse.error ;
      }));
  }

  public UnReserveFile(FileID : number) {
    return this.Request.delete(`${Singleton.API}api/filemanagement/file/booking/check/out` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()}) ,
      body : {
        id_file : FileID
      }
    }).pipe(catchError((ErrorResponse : HttpErrorResponse) => {
      throw ErrorResponse.error ;
    }));
  }

  public EditFile(ObjectFile : File , FileID : number) {
    const FormFile = new FormData() ;
    FormFile.append('file' , ObjectFile , ObjectFile.name) ;
    FormFile.append('id_file' , FileID.toString()) ;
    return this.Request.post(`${Singleton.API}api/filemanagement/file/update` , FormFile , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(catchError((ErrorResponse : HttpErrorResponse) => {
      throw ErrorResponse.error
    }));
  }

  public GetReportInfo(FileID : number) {
    return this.Request.get<FilesResponse>(`${Singleton.API}api/filemanagement/file/report` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()}) ,
      params : new HttpParams().set('id_file' , FileID)
    }).pipe(take(1) , map(Response => {
      const FileValue =  this.ConfigureData({
        APIFile : Response.data.file
      }) ;
      return {
        File : FileValue ,
        Report : Response.data.file.report ,
      } ;
    }) , catchError((ResponseError : HttpErrorResponse) => {
      throw ResponseError.error ;
    }));
  }

  public GetAllMyFile() {
    return this.Request.get<FilesResponse>(`${Singleton.API}api/filemanagement/file/show` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(map(Response => {
      const FileValue : Files[] = [] ;
      Response.data.files.forEach(Value => {
        Value.user = {
          id : this.AccountUser.ID ,
          name : this.AccountUser.Name
        } ;
        FileValue.push(this.ConfigureData({APIFile : Value})) ;
      });
      return FileValue ;
    }) , catchError((ErrorValue : HttpErrorResponse) => {
      throw ErrorValue.error ;
    }));
  }

  public GetWebSiteFiles() {
    return this.Request.get<FilesResponse>(`${Singleton.API}api/filemanagement/file/all` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(map(Response => {
      const WebSiteFile : Files[] = [] ;
      Response.data.files.forEach(Value =>
        WebSiteFile.push(this.ConfigureData({APIFile : Value})));
      return WebSiteFile
    }) , catchError((ErrorValue : HttpErrorResponse) => {
      throw ErrorValue.error ;
    }));
  }

  public DownloadFile(FileItem : Files) {
    return this.Request.get<ArrayBuffer>(`${Singleton.API}${FileItem.FileInfo.Path}` , {
      headers : new HttpHeaders({'Authorization' : this.AccountUser.getToken()})
    }).pipe(take(1) , map(Response => {
        const BlobFile = new Blob([Response]) ;
        const URLFile = URL.createObjectURL(BlobFile) ;
        const OpenURL = open(URLFile) ;
      }))
  }

  private ConfigureData(TypeFile : {
    APIFile : FileResponse ,
    GroupFile ?: Group
  }) {
    const FileValue = this.AdapterProcess.Convert2File(TypeFile.APIFile) ;
    if(TypeFile.GroupFile)
      this.PermissionProcess.GrantPrivateFilePermission(TypeFile.GroupFile , FileValue) ;
    else
      this.PermissionProcess.GrantGlobalFilePermission(FileValue) ;
    return FileValue ;
  }

}
