import {Component, OnInit} from "@angular/core";
import {CommandType, Group, GroupComponent} from "../../Models/GroupsHandle";
import {GroupsService} from "./Groups.service";
import {RoutingProcessService} from "../../Routing/RoutingProcess.service";
import {LoaderService} from "../../Component/Loader/Loader.service";

@Component({
  templateUrl : './Groups.component.html' ,
  styleUrls : ['./Groups.component.css']
})
export class GroupsPrivateComponent implements OnInit , GroupComponent {

  Group_Items: Group[] ;

  constructor(private GroupProcess : GroupsService ,
              private RoutingProcess : RoutingProcessService ,
              private LoadingProcess : LoaderService) {
    this.Group_Items = [] ;
  }

  ngOnInit(): void {
    this.GetGroupData();
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

  private DeleteGroup(GroupID : number): void {
    this.LoadingProcess.ActiveTask() ;
    this.GroupProcess.DeleteGroup(GroupID).subscribe(() => {
      this.GetGroupData();
    });
  }

  private GetFileGroup(GroupItem : Group) {
    this.RoutingProcess.Route2PrivateGroupFile(GroupItem.ID);
  }

  private GetGroupData(): void {
    this.LoadingProcess.ActiveTask() ;
    this.GroupProcess.ShowOwnerGroups().subscribe(Value => {
      this.Group_Items = Value ;
      this.LoadingProcess.DoneTask() ;
    });
  }

  private GetReport(GroupID : number) {
    console.log("Report") ;
  }

}

@Component({
  templateUrl : './Groups.component.html' ,
  styleUrls : ['./Groups.component.css']
})
export class GroupsIncludedComponent implements OnInit , GroupComponent {

  Group_Items: Group[] ;

  constructor(private GroupProcess : GroupsService ,
              private RoutingProcess : RoutingProcessService ,
              private LoadingProcess : LoaderService) {
    this.Group_Items = [] ;
  }

  ngOnInit(): void {
    this.GetGroupData() ;
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

  private DeleteGroup(GroupID : number): void {
    this.LoadingProcess.ActiveTask() ;
    this.GroupProcess.DeleteGroup(GroupID).subscribe(() => {
      this.GetGroupData();
    });
  }

  private GetFileGroup(GroupItem : Group) {
    this.RoutingProcess.Route2PrivateGroupFile(GroupItem.ID);
  }

  private GetGroupData(): void {
    this.LoadingProcess.ActiveTask() ;
    this.GroupProcess.ShowIncludeGroups().subscribe(Value => {
      this.Group_Items = Value ;
      this.LoadingProcess.DoneTask() ;
    });
  }

  private GetReport(GroupID : number) {
    console.log("Report") ;
  }

}
