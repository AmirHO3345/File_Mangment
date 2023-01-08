import {Component, OnInit} from "@angular/core";
import {Files} from "../Models/FilesHandle";
import {Report} from "../Models/ReportHandle";
import {ReportService} from "./Report.service";
import {RoutingProcessService} from "../Routing/RoutingProcess.service";
import {ErrorHandlerManual, FactoryErrors} from "../Models/ErrorHandler";
import {DatePipe} from "@angular/common";
import {LoaderService} from "../Component/Loader/Loader.service";

@Component({
  selector : 'Report' ,
  templateUrl : './Report.component.html' ,
  styleUrls : ['./Report.component.css']
})
export class ReportComponent implements OnInit {

  Error_Handler : ErrorHandlerManual ;

  FileDetails !: Files ;

  ReportDetails !: Report ;

  constructor(private ReportProcess : ReportService ,
              private RoutingProcess : RoutingProcessService ,
              private LoadingProcess : LoaderService ,
              public  DateTransformer: DatePipe) {
    this.Error_Handler = FactoryErrors.GetErrorObject({Report : true}) ;
  }

  ngOnInit(): void {
    const CurrentUrl = this.RoutingProcess.CurrentURl() ;
    const FileID = +CurrentUrl[CurrentUrl.length - 1] ;
    if(isNaN(FileID))
      this.RoutingProcess.Route2Error404();
    this.LoadingProcess.ActiveTask() ;
    this.ReportProcess.GetReportFile(FileID).subscribe(Value => {
      this.FileDetails = Value.File ;
      this.ReportDetails = Value.Report ;
      this.LoadingProcess.DoneTask() ;
    } , ErrorValue => {
      this.Error_Handler.Error_Server(ErrorValue);
      switch (this.Error_Handler.ErrorOccur.Error_Position) {
        case this.Error_Handler.ErrorType().ReportRoute :
        case this.Error_Handler.ErrorType().Permission :
          this.RoutingProcess.Route2Error404() ;
          break ;
      }
      this.LoadingProcess.DoneTask() ;
    });
  }

}
