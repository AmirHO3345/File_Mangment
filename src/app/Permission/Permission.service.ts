import {Injectable} from "@angular/core";
import {Group} from "../Models/GroupsHandle";
import {Person} from "../Models/Person";
import {AuthenticationService} from "../Authentication/Authentication.service";
import {Files} from "../Models/FilesHandle";

@Injectable({providedIn : "root"})
export class PermissionService {

  MyAccount : Person | null ;

  constructor(private AuthenticationProcess : AuthenticationService) {
    this.MyAccount = null ;
    this.StartService();
  }

  private StartService() {
    this.AuthenticationProcess.ListenAccount()
      .subscribe(Value => this.MyAccount = Value);
  }

  public GrantGroupPermission(Group_Item : Group) {
    if(this.MyAccount === null)
      return ;
    const GrantAll = this.MyAccount.getTypePerson() === "Admin" ||
      Group_Item.Admin.ID ===  this.MyAccount.ID ;
    Group_Item.SetPermission({
      Delete : GrantAll ,
      Report : GrantAll
    }) ;
  }

  public GrantGlobalFilePermission(File_Item : Files) {
    if(this.MyAccount === null)
      return ;
    let FileDelete = (!File_Item.IsBooking()) && (this.MyAccount.getTypePerson() === "Admin" ||
      this.MyAccount.ID === File_Item.FileInfo.Owner.ID) ;
    const FileReport = this.MyAccount.getTypePerson() === "Admin" ||
      this.MyAccount.ID === File_Item.FileInfo.Owner.ID ;
    const FileEdit = File_Item.IsBooking()
      && this.MyAccount.ID === File_Item.FileInfo.User_Booking?.UserID ;
    File_Item.SetPermission({
      Delete : FileDelete ,
      Report : FileReport ,
      NotBooking : FileEdit ,
      Edit : FileEdit
    }) ;
  }

  public GrantPrivateFilePermission(Group_Item : Group , File_Item : Files) {
    if(this.MyAccount === null)
      return ;
    const FileDelete = (!File_Item.IsBooking()) && (this.MyAccount.getTypePerson() === "Admin" ||
      this.MyAccount.ID === Group_Item.ID || this.MyAccount.ID === File_Item.FileInfo.Owner.ID) ;
    const FileReport = this.MyAccount.getTypePerson() === "Admin" ||
      this.MyAccount.ID === Group_Item.ID || this.MyAccount.ID === File_Item.FileInfo.Owner.ID ;
    const FileEdit = File_Item.IsBooking() &&
      File_Item.FileInfo.User_Booking?.UserID === this.MyAccount.ID
    File_Item.SetPermission({
      Delete : FileDelete ,
      Report : FileReport ,
      NotBooking : FileEdit ,
      Edit : FileEdit
    }) ;
  }

}
