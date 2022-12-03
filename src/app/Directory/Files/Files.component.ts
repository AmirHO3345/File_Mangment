import {Component, OnInit} from "@angular/core";
import {CommandsFile, FileComponent, Files} from "../../Models/FilesHandle";
import {FilesService} from "./Files.service";
import {RoutingProcessService} from "../../Routing/RoutingProcess.service";

@Component({
  templateUrl : './Files.component.html' ,
  styleUrls : ['./Files.component.css']
})
export class GlobalFilesComponent implements OnInit , FileComponent {

  ItemsFile: Files[];

  constructor(private FileProcess : FilesService) {
    this.ItemsFile = [] ;
  }

  ngOnInit() : void {
    this.GetFileData() ;
  }

  ParserCommandFile(FileInfo: {
    FileID: number ;
    FileCommand: CommandsFile }): void {
    switch (FileInfo.FileCommand) {
      case CommandsFile.Booking :
        this.BooingFile(FileInfo.FileID);
        break ;
      case CommandsFile.NotBooking :
        this.NotBooingFile(FileInfo.FileID);
        break ;
      case CommandsFile.Delete :
        this.DeleteFile(FileInfo.FileID);
        break ;
      case CommandsFile.Report :
        this.GetReport(FileInfo.FileID);
        break ;
      case CommandsFile.Download :
        this.GetDownloadFile(FileInfo.FileID);
        break ;
    }
  }

  private GetFileData() {
    this.FileProcess.ShowFiles(1).subscribe(Value => {
      this.ItemsFile = Value ;
    });
  }

  private DeleteFile(FileID : number) {
    this.FileProcess.DeleteFile(FileID).subscribe(Value => {

    });
  }

  private BooingFile(FileID : number) {

  }

  private NotBooingFile(FileID : number) {

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

  ItemsFile: Files[];

  constructor(private FileProcess : FilesService ,
              private RoutingProcess : RoutingProcessService) {
    this.ItemsFile = [] ;
  }

  ngOnInit() : void {

  }

  ParserCommandFile(FileInfo: {
    FileID: number ;
    FileCommand: CommandsFile }): void {
    switch (FileInfo.FileCommand) {
      case CommandsFile.Booking :
        this.BooingFile(FileInfo.FileID);
        break ;
      case CommandsFile.NotBooking :
        this.NotBooingFile(FileInfo.FileID);
        break ;
      case CommandsFile.Delete :
        this.DeleteFile(FileInfo.FileID);
        break ;
      case CommandsFile.Report :
        this.GetReport(FileInfo.FileID);
        break ;
      case CommandsFile.Download :
        this.GetDownloadFile(FileInfo.FileID);
        break ;
    }
  }

  private GetFileData() {
    const CurrentUrl = this.RoutingProcess.CurrentURl() ;
    this.FileProcess.ShowFiles(+CurrentUrl[CurrentUrl.length - 1])
      .subscribe(Value => this.ItemsFile = Value) ;
  }

  private DeleteFile(FileID : number) {
    this.FileProcess.DeleteFile(FileID).subscribe(Value => {

    });
  }

  private BooingFile(FileID : number) {

  }

  private NotBooingFile(FileID : number) {

  }

  private GetReport(FileID : number) {

  }

  private GetDownloadFile(FileID : number) {

  }

}
