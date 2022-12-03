import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Singleton} from "../Models/Singleton";
import {GroupsService} from "../Directory/Groups/Groups.service";
import {FilesService} from "../Directory/Files/Files.service";

@Component({
  selector : 'NewObject' ,
  templateUrl : './ObjectCreate.component.html' ,
  styleUrls : ['./ObjectCreate.component.css']
})
export class ObjectCreateComponent implements OnInit{

  @Output('Close') CloseComponent : EventEmitter<void>

  GroupInfo : {
    ID : number ,
    Name : string
  }[] ;

  Loading : boolean ;

  public FileUploadInfo !: {
    FileUpload : File ,
    FilePath : string
  } ;

  constructor(private GroupProcess : GroupsService ,
              private FileProcess : FilesService) {
    this.CloseComponent = new EventEmitter<void>() ;
    this.GroupInfo = [] ;
    this.Loading = true ;
  }

  ngOnInit(): void {
    this.GroupProcess.GetAllGroups().subscribe(Value => {
      Value.forEach(GroupItem => {
        this.GroupInfo.push({
          ID : GroupItem.ID ,
          Name : GroupItem.Name
        }) ;
        this.Loading = false ;
      });
    });
  }

  public OnSubmit(InfoForm : NgForm) {
    if(InfoForm.form.invalid) {
      return ;
    }
    const TargetCreate = InfoForm.form.get(this.GetSingleton().FormName.NewObject)
      ?.value as string ;
    if(TargetCreate == 'New File') {
      const FileName = InfoForm.form.get(this.GetSingleton().FormName.FileName)
        ?.value as string ;
      const GroupID = this.GetIdGroup(InfoForm.form.get(this.GetSingleton().FormName.GroupInclude)
        ?.value as string) ;
      this.FileProcess.CreateFile(this.FileUploadInfo.FileUpload , FileName , GroupID).subscribe(Value => {
        this.ClosePopup();
      });
    } else if(TargetCreate == 'New Group') {
      const GroupName = InfoForm.form.get(Singleton.FormName.GroupNameInput)
        ?.value as string ;
      this.GroupProcess.CreateGroup(GroupName).subscribe((Value) => {
        this.ClosePopup();
      });
    }
  }

  public ClosePopup() {
    this.CloseComponent.next();
  }

  public GetSingleton() {
    return Singleton ;
  }

  public GetGroupsName() {
    const GroupsName : string[] = [] ;
    this.GroupInfo.forEach(Value => {
      GroupsName.push(Value.Name);
    }) ;
    return GroupsName
  }

  public SetFile(FileEvent : Event) {
    if(FileEvent.target instanceof HTMLInputElement)
      if(FileEvent.target.files != null)
        this.FileUploadInfo = {
          FileUpload : FileEvent.target.files[0] ,
          FilePath : FileEvent.target.files[0].name
        };
  }

  private GetIdGroup(GroupName : string) {
    let GroupID !: number ;
    this.GroupInfo.forEach(Value => {
      if(Value.Name === GroupName) {
        GroupID = Value.ID ;
        return ;
      }
    });
    return GroupID ;
  }
}
