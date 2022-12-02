import {Component, OnInit} from "@angular/core";
import {FileFactory, Files} from "../../Models/FilesHandle";

@Component({
  selector : 'File_Items' ,
  templateUrl : './Files.component.html' ,
  styleUrls : ['./Files.component.css']
})
export class FilesComponent implements OnInit {

  ItemsFile : Files[] ;

  constructor() {
    this.ItemsFile = [] ;
  }

  ngOnInit() : void {
    this.ItemsFile.push(FileFactory.CreateFile( {
      ID : 1 ,
      Path : '' ,
      Created_Date : new Date() ,
      OwnerID : 1 ,
      FileName : 'temp' ,
      User_Booking : {
        UserID : 2 ,
        UserName : 'amir'
      }
    } , 'Text')) ;
    this.ItemsFile.push(FileFactory.CreateFile( {
      ID : 1 ,
      Path : '' ,
      Created_Date : new Date() ,
      OwnerID : 1 ,
      FileName : 'temp' ,
      User_Booking : {
        UserID : 2 ,
        UserName : 'amir'
      }
    } , 'Image')) ;
    this.ItemsFile.push(FileFactory.CreateFile( {
      ID : 1 ,
      Path : '' ,
      Created_Date : new Date() ,
      OwnerID : 1 ,
      FileName : 'temp' ,
      User_Booking : {
        UserID : 2 ,
        UserName : 'amir'
      }
    } , 'Video')) ;
    this.ItemsFile.push(FileFactory.CreateFile( {
      ID : 1 ,
      Path : '' ,
      Created_Date : new Date() ,
      OwnerID : 1 ,
      FileName : 'temp' ,
      User_Booking : {
        UserID : 2 ,
        UserName : 'amir'
      }
    } , 'Text')) ;
    this.ItemsFile.push(FileFactory.CreateFile( {
      ID : 1 ,
      Path : '' ,
      Created_Date : new Date() ,
      OwnerID : 1 ,
      FileName : 'temp' ,
      User_Booking : {
        UserID : 2 ,
        UserName : 'amir'
      }
    } , 'Text')) ;
    this.ItemsFile.push(FileFactory.CreateFile( {
      ID : 1 ,
      Path : '' ,
      Created_Date : new Date() ,
      OwnerID : 1 ,
      FileName : 'temp' ,
      User_Booking : {
        UserID : 2 ,
        UserName : 'amir'
      }
    } , 'Text')) ;
    this.ItemsFile.push(FileFactory.CreateFile( {
      ID : 1 ,
      Path : '' ,
      Created_Date : new Date() ,
      OwnerID : 1 ,
      FileName : 'temp' ,
      User_Booking : {
        UserID : 2 ,
        UserName : 'amir'
      }
    } , 'Text')) ;
    this.ItemsFile.push(FileFactory.CreateFile( {
      ID : 1 ,
      Path : '' ,
      Created_Date : new Date() ,
      OwnerID : 1 ,
      FileName : 'temp' ,
      User_Booking : {
        UserID : 2 ,
        UserName : 'amir'
      }
    } , 'Text')) ;
    this.ItemsFile.push(FileFactory.CreateFile( {
      ID : 1 ,
      Path : '' ,
      Created_Date : new Date() ,
      OwnerID : 1 ,
      FileName : 'temp' ,
      User_Booking : {
        UserID : 2 ,
        UserName : 'amir'
      }
    } , 'Text')) ;
    this.ItemsFile.push(FileFactory.CreateFile( {
      ID : 1 ,
      Path : '' ,
      Created_Date : new Date() ,
      OwnerID : 1 ,
      FileName : 'temp' ,
      User_Booking : {
        UserID : 2 ,
        UserName : 'amir'
      }
    } , 'Text')) ;
  }

}
