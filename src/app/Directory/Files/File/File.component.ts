import {Component, Input} from "@angular/core";
import {Files} from "../../../Models/FilesHandle";
import {DatePipe} from "@angular/common";

@Component({
  selector : 'File_Item' ,
  templateUrl : './File.component.html' ,
  styleUrls : ['./File.component.css']
})
export class FileComponent {

  ItemFile !: Files ;

  constructor(public DateTransformer: DatePipe) {

  }

  @Input('FileData') set SetFile(FileUpload : Files) {
    this.ItemFile = FileUpload ;
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

}
