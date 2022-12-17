import {Component, OnInit} from "@angular/core";
import {Files} from "../Models/FilesHandle";
import {Report} from "../Models/ReportHandle";
import {ReportService} from "./Report.service";
import {RoutingProcessService} from "../Routing/RoutingProcess.service";
import {ErrorHandlerManual, FactoryErrors} from "../Models/ErrorHandler";
import {DatePipe} from "@angular/common";

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
              public  DateTransformer: DatePipe) {
    this.Error_Handler = FactoryErrors.GetErrorObject({Report : true}) ;
  }

  ngOnInit(): void {
    const CurrentUrl = this.RoutingProcess.CurrentURl() ;
    this.ReportProcess.GetReportFile(+CurrentUrl[CurrentUrl.length - 1]).subscribe(Value => {
      this.FileDetails = Value.File ;
      this.ReportDetails = Value.Report ;
    } , ErrorValue => {
      this.Error_Handler.Error_Server(ErrorValue);
      if(this.Error_Handler.ErrorOccur.Error_Position
        === this.Error_Handler.ErrorType().ReportRoute)
          this.RoutingProcess.Route2Error404() ;
    });
  }

}
