import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CommandsFile, Files} from "../../../Models/FilesHandle";
import {DatePipe} from "@angular/common";

@Component({
  selector : 'File_Item' ,
  templateUrl : './File.component.html' ,
  styleUrls : ['./File.component.css']
})
export class FileComponent {

  ItemFile !: Files ;

  private readonly CommandOut : EventEmitter<{
    GroupID : number ,
    GroupCommand : CommandsFile
  }> ;

  @Output('GetCommand') get GetCommand() {
    return this.CommandOut ;
  }

  @Input('FileData') set SetFile(FileUpload : Files) {
    this.ItemFile = FileUpload ;
  }

  constructor(public DateTransformer: DatePipe) {
    this.CommandOut = new EventEmitter<{GroupID: number , GroupCommand: CommandsFile}>();
  }

  GetIconFile() {
    switch (this.ItemFile.Type) {
      case "Text":
        return 'bx bxs-file' ;
      case "Image":
        return 'bx bxs-image-alt' ;
      case "Video":
        return 'bx bxs-videos' ;
    }
    return '' ;
  }

  SendCommand(FileCommand : CommandsFile) {
    this.CommandOut.emit({
      GroupID : this.ItemFile.FileInfo.ID ,
      GroupCommand : FileCommand
    }) ;
  }

  GetAllCommands() {
    return CommandsFile
  }



}
