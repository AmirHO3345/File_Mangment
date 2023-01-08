import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Singleton} from "../Models/Singleton";
import {GroupsService} from "../Directory/Groups/Groups.service";
import {FilesService} from "../Directory/Files/Files.service";
import {LoaderService} from "../Component/Loader/Loader.service";
import {forkJoin} from "rxjs";
import {UsersService} from "../Directory/Users/Users.service";
import {ErrorHandlerManual, FactoryErrors} from "../Models/ErrorHandler";

@Component({
  selector : 'NewObject' ,
  templateUrl : './ObjectCreate.component.html' ,
  styleUrls : ['./ObjectCreate.component.css']
})
export class ObjectCreateComponent{

  @Output('Close') CloseComponent : EventEmitter<void> ;

  GroupsView : {
    ID : number ,
    Name : string
  }[] ;

  UsersView : {
    ID : number ,
    Name : string
  }[] ;

  FileUploadInfo !: {
    FileUpload : File ,
    FilePath : string
  } ;

  Error_Handle : ErrorHandlerManual ;

  constructor(private GroupProcess : GroupsService ,
              private UserProcess : UsersService ,
              private FileProcess : FilesService ,
              private LoadingProcess : LoaderService) {
    this.CloseComponent = new EventEmitter<void>() ;
    this.GroupsView = [] ;
    this.UsersView = [] ;
    this.Error_Handle = FactoryErrors.GetErrorObject({NewCreate : true}) ;
  }

  public ChangeObject(ChangeState : string) {
    this.LoadingProcess.ActiveTask() ;
    if(ChangeState == 'New File') {
      this.GroupProcess.GetAllGroups().subscribe(Value => {
        this.GroupsView = [] ;
        this.UsersView = [] ;
        Value.forEach(GroupItem => {
          this.GroupsView.push({
            ID : GroupItem.ID ,
            Name : GroupItem.Name
          }) ;
        });
        this.LoadingProcess.DoneTask() ;
      } , ErrorValue => {
        this.LoadingProcess.DoneTask() ;
      });
    }
    else if(ChangeState == 'New Group') {
      this.UsersView = [] ;
      this.GroupsView = [] ;
      this.LoadingProcess.DoneTask() ;
    }
    else if(ChangeState == 'Join User') {
      forkJoin([this.GroupProcess.ShowOwnerGroups() ,
        this.UserProcess.GetAllUsers()]).subscribe(Value => {
          this.UsersView = [] ;
          this.GroupsView = [] ;
          Value[0].forEach(GroupItem => {
            this.GroupsView.push({
              ID : GroupItem.ID ,
              Name : GroupItem.Name
            }) ;
          });
          Value[1].forEach(UserItem => {
            this.UsersView.push({
              ID : UserItem.ID ,
              Name : UserItem.Name
            })
          });
          console.log(this.UsersView) ;
         this.LoadingProcess.DoneTask();
      } , ErrorValue => {
          this.LoadingProcess.DoneTask() ;
      });
    }
  }

  public GetGroupsName() {
    const GroupInfo : string[] = [] ;
    this.GroupsView.forEach(Value => {
       GroupInfo.push(Value.Name) ;
    });
    return GroupInfo ;
  }

  public GetUsersName() {
    const UsersInfo : string[] = [] ;
    this.UsersView.forEach(Value => {
      UsersInfo.push(Value.Name) ;
    });
    return UsersInfo ;
  }

  public GetIdGroup(Name : string) {
    let IDGroup !: number ;
    this.GroupsView.forEach(Value => {
      if(Name === Value.Name)
        IDGroup = Value.ID ;
    });
    return IDGroup ;
  }

  public GetIdUser(Name : string) {
    let IDUser !: number ;
    this.UsersView.forEach(Value => {
      if(Name === Value.Name)
        IDUser = Value.ID ;
    });
    return IDUser
  }

  public OnSubmit(InfoForm : NgForm) {
    this.Error_Handle.ErrorOccur.Error_Render = false ;
    if(InfoForm.form.invalid || !InfoForm.form.get(this.GetSingleton().FormName.NewObject)) {
      this.Error_Handle.Error_Front(InfoForm.form) ;
      return ;
    }
    try {
      this.LoadingProcess.ActiveTask();
      const TargetCreate = InfoForm.form.get(this.GetSingleton().FormName.NewObject)
        ?.value as string ;
      if(TargetCreate == 'New File')
        this.CheckCreateFile(InfoForm) ;
      else if(TargetCreate == 'New Group')
        this.CheckCreateGroup(InfoForm) ;
      else if(TargetCreate == 'Join User')
        this.CheckCreateUser(InfoForm) ;
    } catch (ErrorValue) {
      this.Error_Handle.Error_Front(InfoForm.form) ;
      this.LoadingProcess.DoneTask();
    }

  }

  public ClosePopup() {
    this.CloseComponent.next();
  }

  public GetSingleton() {
    return Singleton ;
  }

  public SetFile(FileEvent : Event) {
    if(FileEvent.target instanceof HTMLInputElement)
      if(FileEvent.target.files != null)
        this.FileUploadInfo = {
          FileUpload : FileEvent.target.files[0] ,
          FilePath : FileEvent.target.files[0].name
        };
  }

  private CheckCreateFile(InfoForm : NgForm) {
    const FileName = InfoForm.form.get(this.GetSingleton().FormName.FileName)
      ?.value as string ;
    const GroupID = this.GetIdGroup(InfoForm.form.get(this.GetSingleton().FormName.GroupInclude)
      ?.value as string) ;
    this.FileProcess.CreateFile(this.FileUploadInfo.FileUpload , FileName , GroupID).subscribe(Value => {
      this.LoadingProcess.DoneTask();
      this.ClosePopup();
    } , ErrorValue => {
      this.Error_Handle.Error_Server(ErrorValue) ;
      this.LoadingProcess.DoneTask();
    });
  }

  private CheckCreateUser(InfoForm : NgForm) {
    const GroupID = this.GetIdGroup(InfoForm.form.get(this.GetSingleton().FormName.GroupInclude)
      ?.value as string) ;
    const UserID = this.GetIdUser(InfoForm.form.get(this.GetSingleton().FormName.UserNameInput)
      ?.value as string) ;
    this.UserProcess.JoinUser(GroupID , UserID).subscribe(Value => {
      this.LoadingProcess.DoneTask();
      this.ClosePopup();
    } , ErrorValue => {
      this.Error_Handle.Error_Server(ErrorValue) ;
      this.LoadingProcess.DoneTask();
    });
  }

  private CheckCreateGroup(InfoForm : NgForm) {
    const GroupName = InfoForm.form.get(Singleton.FormName.GroupNameInput)
      ?.value as string ;
    this.GroupProcess.CreateGroup(GroupName).subscribe((Value) => {
      this.LoadingProcess.DoneTask();
      this.ClosePopup();
    } , ErrorValue => {
      this.Error_Handle.Error_Server(ErrorValue) ;
      this.LoadingProcess.DoneTask();
    });
  }

}
