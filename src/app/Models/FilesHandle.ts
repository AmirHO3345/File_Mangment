
interface FileInfo {

  readonly ID : number ;

  readonly FileName : string ;

  readonly Path : string ;

  readonly Created_Date : Date ;

  readonly Owner : {
    readonly ID : number ,
    readonly Name : string
  } ;

  User_Booking ?: {
    UserID : number ,
    UserName : string
  } ;

}

export interface FileComponent {

  ItemsFile : Files[] ;

  ParserCommandFile(FileInfo : {
    FileItem : Files ,
    FileCommand : CommandsFile
  }) : void ;

}

export abstract class Files {

  abstract FileInfo : FileInfo ;

  abstract Type : 'Image' | 'Text' | 'Video' ;

  private Permission !: {
    CanReport : boolean ,
    CanDelete : boolean ,
    CanNotBooking : boolean ,
  } ;

  public IsBooking() {
    return !!this.FileInfo.User_Booking ;
  }

  public SetPermission(PermissionGrant : {
    Report : boolean ,
    Delete : boolean ,
    NotBooking : boolean
  }) {
    if(this.Permission === undefined) {
      this.Permission = {
        CanReport : PermissionGrant.Report ,
        CanDelete : PermissionGrant.Delete ,
        CanNotBooking : PermissionGrant.NotBooking
      } ;
    }
  }

  public GetPermission() {
    return {...this.Permission};
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

export enum CommandsFile {
  Booking ,
  Delete ,
  Report ,
  NotBooking,
  Download
}
