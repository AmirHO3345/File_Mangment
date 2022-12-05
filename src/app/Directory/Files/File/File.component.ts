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
    FileItem : Files ,
    GroupCommand : CommandsFile
  }> ;

  @Output('GetCommand') get GetCommand() {
    return this.CommandOut ;
  }

  @Input('FileData') set SetFile(FileUpload : Files) {
    this.ItemFile = FileUpload ;
  }

  constructor(public DateTransformer: DatePipe) {
    this.CommandOut = new EventEmitter<{FileItem : Files , GroupCommand: CommandsFile}>();
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
      FileItem : this.ItemFile ,
      GroupCommand : FileCommand
    }) ;
  }

  GetAllCommands() {
    return CommandsFile
  }

}
