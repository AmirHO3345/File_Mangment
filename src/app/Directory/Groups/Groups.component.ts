import {Component, OnInit} from "@angular/core";
import {CommandType, Group} from "../../Models/GroupsHandle";
import {GroupsService} from "./Groups.service";
import {RoutingProcessService} from "../../Routing/RoutingProcess.service";
import {LoaderService} from "../../Component/Loader/Loader.service";
import {ProcessPopupService} from "../../Component/ProcessPopup/ProcessPopup.service";
import {ErrorHandlerManual, FactoryErrors} from "../../Models/ErrorHandler";


export abstract class GroupComponent {

  Group_Items : Group[] ;

  Error_Handle : ErrorHandlerManual ;

  constructor(protected GroupProcess : GroupsService ,
              protected RoutingProcess : RoutingProcessService ,
              protected LoadingProcess : LoaderService ,
              protected PopupProcess : ProcessPopupService) {
    this.Group_Items = [] ;
    this.Error_Handle = FactoryErrors.GetErrorObject({
      Groups : true
    }) ;
  }

  public abstract ParserCommandGroup(GroupInfo : {
    GroupItem : Group ,
    GroupCommand : CommandType
  }) : void ;

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
    this.RoutingProcess.Route2PrivateGroupFile(GroupItem.ID);
  }

  protected GetReport(GroupID : number) {
    console.log("Report") ;
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

  public ParserCommandGroup(GroupInfo : {
    GroupItem : Group ,
    GroupCommand : CommandType
  }) {
    switch (GroupInfo.GroupCommand) {
      case CommandType.GroupEnter :
        this.GetFileGroup(GroupInfo.GroupItem) ;
        break ;
      case CommandType.ReportEnter :
        this.GetReport(GroupInfo.GroupItem.ID) ;
        break ;
      case CommandType.DeleteGroup :
        this.DeleteGroup(GroupInfo.GroupItem.ID) ;
        break ;
    }
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

  ParserCommandGroup(GroupInfo : {
    GroupItem : Group ,
    GroupCommand : CommandType
  }) {
    switch (GroupInfo.GroupCommand) {
      case CommandType.GroupEnter :
        this.GetFileGroup(GroupInfo.GroupItem) ;
        break ;
      case CommandType.ReportEnter :
        this.GetReport(GroupInfo.GroupItem.ID) ;
        break ;
      case CommandType.DeleteGroup :
        this.DeleteGroup(GroupInfo.GroupItem.ID) ;
        break ;
    }
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
