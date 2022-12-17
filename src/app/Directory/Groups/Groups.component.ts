import {Component, OnInit} from "@angular/core";
import {CommandType, Group} from "../../Models/GroupsHandle";
import {GroupsService} from "./Groups.service";
import {RoutingProcessService} from "../../Routing/RoutingProcess.service";
import {LoaderService} from "../../Component/Loader/Loader.service";
import {ProcessPopupService} from "../../Component/ProcessPopup/ProcessPopup.service";
import {ErrorHandlerManual, FactoryErrors} from "../../Models/ErrorHandler";


export abstract class GroupComponent {

  Group_Items : Group[] ;

  PopupInfo : {
    GroupInfo : Group | null
  } ;

  Error_Handle : ErrorHandlerManual ;

  constructor(protected GroupProcess : GroupsService ,
              protected RoutingProcess : RoutingProcessService ,
              protected LoadingProcess : LoaderService ,
              protected PopupProcess : ProcessPopupService) {
    this.Group_Items = [] ;
    this.PopupInfo = {
      GroupInfo : null
    } ;
    this.Error_Handle = FactoryErrors.GetErrorObject({
      Groups : true
    }) ;
  }

  public ParserCommandGroup(GroupInfo : {
    GroupItem : Group ,
    GroupCommand : CommandType
  }) : void {
    switch (GroupInfo.GroupCommand) {
      case CommandType.GroupEnter :
        this.OpenPopup(GroupInfo.GroupItem) ;
        break ;
      case CommandType.ReportEnter :
        this.GetReport(GroupInfo.GroupItem.ID) ;
        break ;
      case CommandType.DeleteGroup :
        this.DeleteGroup(GroupInfo.GroupItem.ID) ;
        break ;
      case CommandType.ClosePopup :
        this.ClosePopup() ;
        break ;
      case CommandType.GroupFiles :
        this.GetFileGroup(GroupInfo.GroupItem) ;
        break ;
      case CommandType.GroupUsers :
        this.GetUserGroup(GroupInfo.GroupItem) ;
        break ;
    }
  }

  protected abstract InitialData(): void ;

  protected abstract UpdateData(): void ;

  protected DeleteGroup(GroupID : number): void {
    this.LoadingProcess.ActiveTask() ;
    this.GroupProcess.DeleteGroup(GroupID).subscribe(() => {
      this.UpdateData();
    } , ErrorResponse => {
      this.Error_Handle.Error_Server(ErrorResponse) ;
      this.PopupProcess.ViewPopup("Error", this.Error_Handle.ErrorOccur.Error_Message) ;
      this.LoadingProcess.DoneTask() ;
    });
  }

  protected GetFileGroup(GroupItem : Group) {
    this.ClosePopup() ;
    this.RoutingProcess.Route2PrivateGroupFile(GroupItem.ID);
  }

  protected GetUserGroup(GroupItem : Group) {
    this.ClosePopup() ;
    this.RoutingProcess.Routing2UserGroup(GroupItem.ID) ;
  }

  protected OpenPopup(GroupItem : Group) {
    this.PopupInfo.GroupInfo = GroupItem ;
  }

  protected ClosePopup() {
    this.PopupInfo.GroupInfo = null ;
  }

  protected GetReport(GroupID : number) {
    console.log("Report") ;
  }

  GetAllCommands() {
    return CommandType
  }

}

@Component({
  templateUrl : './Groups.component.html' ,
  styleUrls : ['./Groups.component.css']
})
export class GroupsPrivateComponent extends GroupComponent implements OnInit {

  constructor(protected override GroupProcess : GroupsService ,
              protected override RoutingProcess : RoutingProcessService ,
              protected override LoadingProcess : LoaderService ,
              protected override PopupProcess : ProcessPopupService) {
    super(GroupProcess , RoutingProcess , LoadingProcess , PopupProcess) ;
    this.Group_Items = [] ;
  }

  ngOnInit(): void {
    this.InitialData();
  }

  protected InitialData(): void {
    this.LoadingProcess.ActiveTask() ;
    this.GroupProcess.ShowOwnerGroups().subscribe(Value => {
      this.Group_Items = Value ;
      this.LoadingProcess.DoneTask() ;
    } , ErrorResponse => {
      this.Error_Handle.Error_Server(ErrorResponse) ;
      this.PopupProcess.ViewPopup("Error", this.Error_Handle.ErrorOccur.Error_Message) ;
      this.LoadingProcess.DoneTask() ;
    });
  }

  protected UpdateData(): void {
    this.InitialData() ;
  }

}

@Component({
  templateUrl : './Groups.component.html' ,
  styleUrls : ['./Groups.component.css']
})
export class GroupsIncludedComponent extends GroupComponent implements OnInit {

  constructor(protected override GroupProcess : GroupsService ,
              protected override RoutingProcess : RoutingProcessService ,
              protected override LoadingProcess : LoaderService ,
              protected override PopupProcess : ProcessPopupService) {
    super(GroupProcess , RoutingProcess , LoadingProcess , PopupProcess) ;
    this.Group_Items = [] ;
  }

  ngOnInit(): void {
    this.InitialData() ;
  }

  protected InitialData(): void {
    this.LoadingProcess.ActiveTask() ;
    this.GroupProcess.ShowIncludeGroups().subscribe(Value => {
      this.Group_Items = Value ;
      this.LoadingProcess.DoneTask() ;
    } , ErrorResponse => {
      this.Error_Handle.Error_Server(ErrorResponse) ;
      this.PopupProcess.ViewPopup("Error", this.Error_Handle.ErrorOccur.Error_Message) ;
      this.LoadingProcess.DoneTask() ;
    });
  }

  protected UpdateData(): void {
    this.InitialData();
  }

}

@Component({
  templateUrl : './Groups.component.html' ,
  styleUrls : ['./Groups.component.css']
})
export class AllWebSiteGroups extends GroupComponent implements OnInit {

  constructor(protected override GroupProcess : GroupsService ,
              protected override RoutingProcess : RoutingProcessService ,
              protected override LoadingProcess : LoaderService ,
              protected override PopupProcess : ProcessPopupService) {
    super(GroupProcess , RoutingProcess , LoadingProcess , PopupProcess) ;
    this.Group_Items = [] ;
  }

  ngOnInit(): void {
    this.InitialData() ;
  }

  protected InitialData(): void {
    this.LoadingProcess.ActiveTask() ;
    this.GroupProcess.GetWebSiteGroups().subscribe(Value => {
      this.Group_Items = Value ;
      this.LoadingProcess.DoneTask() ;
    } , ErrorResponse => {
      this.LoadingProcess.DoneTask() ;
    });
  }

  protected UpdateData(): void {
    this.InitialData();
  }

}
