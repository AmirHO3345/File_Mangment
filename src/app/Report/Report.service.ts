import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FilesService, ReportResponse} from "../Directory/Files/Files.service";
import {AdapterService} from "../Adapter/Adapter.service";
import {Person} from "../Models/Person";
import {AuthenticationService} from "../Authentication/Authentication.service";
import {catchError, map} from "rxjs";

@Injectable({providedIn : "root"})
export class ReportService {

  AccountUser !: Person ;

  constructor(private Request : HttpClient ,
              private AdapterProcess : AdapterService ,
              private AuthenticationProcess : AuthenticationService ,
              private FileProcess : FilesService) {
    this.StartService() ;
  }

  private StartService() {
    this.AccountUser = this.AuthenticationProcess.AccountSnapshot() as Person ;
  }

  public GetReportFile(FileID : number) {
    return this.FileProcess.GetReportInfo(FileID).pipe(map(ValueResponse => {
      return {
        File : ValueResponse.File ,
        Report : this.ConfigureData(ValueResponse.Report)
      } ;
    }) , catchError((ErrorValue : HttpErrorResponse) => {
      throw ErrorValue.error ;
    }));
  }

  private ConfigureData(ReportAPI : ReportResponse[]) {
    return this.AdapterProcess.Convert2ReportFile(ReportAPI);
  }

}
