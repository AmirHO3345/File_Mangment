import {Singleton} from "./Singleton";

interface FileInfo {

  readonly ID : number ;

  readonly OwnerID : number ;

  readonly FileName : string ;

  readonly Path : string ;

  readonly Created_Date : Date ;

  User_Booking ?: {
    UserID : number ,
    UserName : string
  } ;

}

export abstract class Files {

  abstract FileInfo : FileInfo ;

  abstract Type : 'Image' | 'Text' | 'Video' ;

  IsBooking() {
    return !!this.FileInfo.User_Booking ;
  }

  GetPath() {
    return Singleton.API.concat( '/' , this.FileInfo.Path) ;
  }

}

export class FileFactory {

  public static CreateFile(FileSave : FileInfo , Type : 'Text' |
    'Image' | 'Video') : Files {
    let FileObject : Files ;
    switch (Type) {
      case "Text":
        FileObject = new TextFile(FileSave) ;
        break ;
      case "Image":
        FileObject = new ImageFile(FileSave) ;
        break ;
      case "Video":
        FileObject = new VideoFile(FileSave) ;
        break ;
    }
    return FileObject ;
  }

}

class ImageFile extends Files {

  FileInfo: FileInfo ;

  Type: "Image" | "Text" | "Video";

  constructor(Info : FileInfo) {
    super() ;
    this.FileInfo = Info ;
    this.Type = 'Image' ;
  }

}

class VideoFile extends Files {

  FileInfo: FileInfo;

  Type: "Image" | "Text" | "Video";

  constructor(Info : FileInfo) {
    super() ;
    this.FileInfo = Info ;
    this.Type = 'Video' ;
  }

}

class TextFile extends Files {

  FileInfo: FileInfo ;

  Type: "Image" | "Text" | "Video";

  constructor(Info : FileInfo) {
    super() ;
    this.FileInfo = Info ;
    this.Type = "Text" ;
  }

}
