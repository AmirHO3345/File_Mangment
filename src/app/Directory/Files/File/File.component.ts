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

  IsSelected : boolean ;

  private readonly CommandOut : EventEmitter<{
    FileItem : Files ,
    FileCommand : CommandsFile ,
    FileUpload ?: File
  }> ;

  @Output('GetCommand') get GetCommand() {
    return this.CommandOut ;
  }

  @Input('FileData') set SetFile(FileUpload : Files) {
    this.ItemFile = FileUpload ;
  }

  constructor(public DateTransformer: DatePipe) {
    this.CommandOut = new EventEmitter<{FileItem : Files
      , FileCommand: CommandsFile , FileUpload ?: File}>();
    this.IsSelected = false ;
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

  EditFile(FileEvent : Event) {
    if(FileEvent.target instanceof HTMLInputElement)
      if(FileEvent.target.files != null)
        this.SendCommand(CommandsFile.Edit , FileEvent.target.files[0]) ;
  }

  SendCommand(FileCommand : CommandsFile , FileUpload ?: File) {
    this.CommandOut.emit({
      FileItem : this.ItemFile ,
      FileCommand : FileCommand ,
      FileUpload : FileUpload
    }) ;
    if(FileCommand === CommandsFile.Selected)
      this.IsSelected = true ;
    else if(FileCommand === CommandsFile.UnSelected)
      this.IsSelected = false ;
  }

  GetAllCommands() {
    return CommandsFile
  }

}
