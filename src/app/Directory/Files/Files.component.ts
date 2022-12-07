import {Component, OnInit} from "@angular/core";
import {CommandsFile, Files} from "../../Models/FilesHandle";
import {FilesService} from "./Files.service";
import {Group} from "../../Models/GroupsHandle";
import {RoutingProcessService} from "../../Routing/RoutingProcess.service";
import {LoaderService} from "../../Component/Loader/Loader.service";
import {ProcessPopupService} from "../../Component/ProcessPopup/ProcessPopup.service";
import {ErrorHandlerManual, FactoryErrors} from "../../Models/ErrorHandler";


export abstract class FileComponent {

  ItemsFile : Files[] ;

  Error_Handler : ErrorHandlerManual ;

  constructor(protected FileProcess : FilesService ,
              protected RoutingProcess : RoutingProcessService ,
              protected LoadingProcess : LoaderService ,
              protected PopupProcess : ProcessPopupService) {
    this.ItemsFile = [] ;
    this.Error_Handler = FactoryErrors.GetErrorObject({
      Files : true
    }) ;
  }

  public ParserCommandFile(FileInfo : {
    FileItem : Files ,
    FileCommand : CommandsFile ,
    FileUpload ?: File
  })  {
    switch (FileInfo.FileCommand) {
      case CommandsFile.Booking :
        this.BookingFile(FileInfo.FileItem.FileInfo.ID);
        break ;
      case CommandsFile.NotBooking :
        this.NotBookingFile(FileInfo.FileItem.FileInfo.ID);
        break ;
      case CommandsFile.Delete :
        this.DeleteFile(FileInfo.FileItem.FileInfo.ID);
        break ;
      case CommandsFile.Report :
        this.GetReport(FileInfo.FileItem.FileInfo.ID);
        break ;
      case CommandsFile.Download :
        this.GetDownloadFile(FileInfo.FileItem.FileInfo.ID);
        break ;
      case CommandsFile.Edit :
        if(FileInfo.FileUpload)
          this.EditFile(FileInfo.FileItem.FileInfo.ID , FileInfo.FileUpload) ;
        break ;
    }
  }

  protected abstract InitialData() : void ;

  protected abstract UpdateFileData() : void ;

  protected DeleteFile(FileID : number) {
    this.LoadingProcess.ActiveTask() ;
    this.FileProcess.DeleteFile(FileID).subscribe(Value => {
      this.UpdateFileData();
    } , ErrorValue => {
      this.Error_Handler.Error_Server(ErrorValue) ;
      this.PopupProcess.ViewPopup("Error", this.Error_Handler.ErrorOccur.Error_Message) ;
      this.LoadingProcess.DoneTask() ;
    });
  }

  protected BookingFile(FileID : number) {
    this.LoadingProcess.ActiveTask();
    this.FileProcess.ReserveFile([FileID]).subscribe(() => {
      this.UpdateFileData();
    } , ErrorValue => {
      this.Error_Handler.Error_Server(ErrorValue) ;
      this.PopupProcess.ViewPopup("Error", this.Error_Handler.ErrorOccur.Error_Message ) ;
      this.LoadingProcess.DoneTask() ;
    });
  }

  protected NotBookingFile(FileID : number) {
    this.LoadingProcess.ActiveTask();
    this.FileProcess.UnReserveFile(FileID).subscribe(() => {
      this.UpdateFileData();
    } , ErrorValue => {
      this.Error_Handler.Error_Server(ErrorValue) ;
      this.PopupProcess.ViewPopup("Error", this.Error_Handler.ErrorOccur.Error_Message ) ;
      this.LoadingProcess.DoneTask() ;
    });
  }

  protected EditFile(FileID : number , UploadFile : File) {
    this.LoadingProcess.ActiveTask();
    this.FileProcess.EditFile(UploadFile , FileID).subscribe(() => {
      this.UpdateFileData() ;
    });
  }

  protected GetReport(FileID : number) {
    this.RoutingProcess.Route2Report(FileID) ;
  }

  protected GetDownloadFile(FileID : number) {
    /* GetFileData */
  }

}


@Component({
  templateUrl : './Files.component.html' ,
  styleUrls : ['./Files.component.css']
})
export class GlobalFilesComponent extends FileComponent implements OnInit {

  constructor(protected override FileProcess : FilesService ,
              protected override RoutingProcess : RoutingProcessService ,
              protected override LoadingProcess : LoaderService ,
              protected override PopupProcess : ProcessPopupService) {
    super(FileProcess , RoutingProcess , LoadingProcess , PopupProcess) ;
    this.ItemsFile = [] ;
  }

  ngOnInit() : void {
    this.InitialData() ;
  }

  protected InitialData(): void {
    this.LoadingProcess.ActiveTask() ;
    this.FileProcess.GetGlobalGroupFile().subscribe(Value => {
      this.ItemsFile = Value as Files[] ;
      this.LoadingProcess.DoneTask() ;
    } , ErrorValue => {
      this.Error_Handler.Error_Server(ErrorValue) ;
      this.PopupProcess.ViewPopup("Error", this.Error_Handler.ErrorOccur.Error_Message ) ;
      this.LoadingProcess.DoneTask() ;
    });
  }

  protected UpdateFileData(): void {
    this.InitialData() ;
  }

}


@Component({
  templateUrl : './Files.component.html' ,
  styleUrls : ['./Files.component.css']
})
export class PrivateFilesComponent extends FileComponent implements OnInit {

  MainGroup !: Group ;

  constructor(protected override FileProcess : FilesService ,
              protected override RoutingProcess : RoutingProcessService ,
              protected override LoadingProcess : LoaderService ,
              protected override PopupProcess : ProcessPopupService) {
    super(FileProcess  , RoutingProcess , LoadingProcess , PopupProcess) ;
    this.ItemsFile = [] ;
  }

  ngOnInit() : void {
    this.InitialData();
  }

  protected InitialData() {
    this.LoadingProcess.ActiveTask() ;
    const CurrentUrl = this.RoutingProcess.CurrentURl() ;
    this.FileProcess.GetPrivateGroupFile(+CurrentUrl[CurrentUrl.length - 1])
      .subscribe(Value => {
        if(Value) {
          this.MainGroup = Value.GroupObject ;
          this.ItemsFile = Value.GroupFiles
        }
        this.LoadingProcess.DoneTask() ;
      } , ErrorValue => {
        this.Error_Handler.Error_Server(ErrorValue) ;
        this.PopupProcess.ViewPopup("Error", this.Error_Handler.ErrorOccur.Error_Message ) ;
        this.LoadingProcess.DoneTask() ;
      });
  }

  protected UpdateFileData() {
    this.InitialData();
  }

}

@Component({
  templateUrl : './Files.component.html' ,
  styleUrls : ['./Files.component.css']
})
export class MyFilesComponent extends FileComponent implements OnInit {

  constructor(protected override FileProcess : FilesService ,
              protected override RoutingProcess : RoutingProcessService ,
              protected override LoadingProcess : LoaderService ,
              protected override PopupProcess : ProcessPopupService) {
    super(FileProcess  , RoutingProcess , LoadingProcess , PopupProcess) ;
    this.ItemsFile = [] ;
  }

  ngOnInit() : void {
    this.InitialData();
  }

  protected InitialData() {
    this.LoadingProcess.ActiveTask() ;
    this.FileProcess.GetAllMyFile().subscribe(Value => {
      this.ItemsFile = Value ;
      this.LoadingProcess.DoneTask() ;
    } , () => {
      this.LoadingProcess.DoneTask() ;
    }) ;
  }

  protected UpdateFileData() {
    this.InitialData();
  }

}
