import {Component, OnInit} from "@angular/core";
import {CommandsFile, FileComponent, Files} from "../../Models/FilesHandle";
import {FilesService} from "./Files.service";
import {Group} from "../../Models/GroupsHandle";
import {RoutingProcessService} from "../../Routing/RoutingProcess.service";
import {GroupsService} from "../Groups/Groups.service";
import {LoaderService} from "../../Component/Loader/Loader.service";

@Component({
  templateUrl : './Files.component.html' ,
  styleUrls : ['./Files.component.css']
})
export class GlobalFilesComponent implements OnInit , FileComponent {

  ItemsFile: Files[];

  constructor(private FileProcess : FilesService ,
              private LoadingProcess : LoaderService) {
    this.ItemsFile = [] ;
  }

  ngOnInit() : void {
    this.GetFileData() ;
  }

  ParserCommandFile(FileInfo: {
    FileItem: Files ;
    FileCommand: CommandsFile }): void {
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
    }
  }

  private GetFileData() {
    this.LoadingProcess.ActiveTask() ;
    this.FileProcess.GetGlobalGroupFile().subscribe(Value => {
      this.ItemsFile = Value ;
      this.LoadingProcess.DoneTask() ;
    });
  }

  private DeleteFile(FileID : number) {
    this.LoadingProcess.ActiveTask() ;
    this.FileProcess.DeleteFile(FileID).subscribe(Value => {
      this.GetFileData();
    });
  }

  private BookingFile(FileID : number) {
    this.FileProcess.ReserveFile([FileID]).subscribe(() => {
      this.GetFileData();
    });
  }

  private NotBookingFile(FileID : number) {
    this.FileProcess.UnReserveFile(FileID).subscribe(() => {
      this.GetFileData();
    })
  }

  private GetReport(FileID : number) {

  }

  private GetDownloadFile(FileID : number) {

  }

}


@Component({
  templateUrl : './Files.component.html' ,
  styleUrls : ['./Files.component.css']
})
export class PrivateFilesComponent implements OnInit , FileComponent {

  MainGroup !: Group ;

  ItemsFile: Files[];

  constructor(private FileProcess : FilesService ,
              private GroupProcess : GroupsService ,
              private RoutingProcess : RoutingProcessService ,
              private LoadingProcess : LoaderService) {
    this.ItemsFile = [] ;
  }

  ngOnInit() : void {
    this.InitialData();
  }

  ParserCommandFile(FileInfo: {
    FileItem: Files ;
    FileCommand: CommandsFile }): void {
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
    }
  }

  private InitialData() {
    this.LoadingProcess.ActiveTask() ;
    const CurrentUrl = this.RoutingProcess.CurrentURl() ;
    this.GroupProcess.GetGroupWithFile(+CurrentUrl[CurrentUrl.length - 1])
      .subscribe(Value => {
        if(Value) {
          this.MainGroup = Value.GroupObject ;
          this.ItemsFile = Value.GroupFiles
        }
        this.LoadingProcess.DoneTask() ;
      });
  }

  private UpdateFileData() {
    this.LoadingProcess.ActiveTask() ;
    this.FileProcess.GetPrivateGroupFile(this.MainGroup)
      .subscribe(Value => {
        this.ItemsFile = Value ;
        this.LoadingProcess.DoneTask() ;
      }) ;
  }

  private DeleteFile(FileID : number) {
    this.LoadingProcess.ActiveTask() ;
    this.FileProcess.DeleteFile(FileID).subscribe(Value => {
      this.UpdateFileData();
    });
  }

  private BookingFile(FileID : number) {
    this.FileProcess.ReserveFile([FileID]).subscribe(() => {
      this.UpdateFileData();
    });
  }

  private NotBookingFile(FileID : number) {
    this.FileProcess.UnReserveFile(FileID).subscribe(() => {
      this.UpdateFileData();
    });
  }

  private GetReport(FileID : number) {

  }

  private GetDownloadFile(FileID : number) {
    /* GetFileData */
  }

}
