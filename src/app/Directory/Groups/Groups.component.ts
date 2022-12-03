import {Component, OnInit} from "@angular/core";
import {CommandType, Group, GroupComponent} from "../../Models/GroupsHandle";
import {GroupsService} from "./Groups.service";
import {RoutingProcessService} from "../../Routing/RoutingProcess.service";

@Component({
  templateUrl : './Groups.component.html' ,
  styleUrls : ['./Groups.component.css']
})
export class GroupsPrivateComponent implements OnInit , GroupComponent {

  Group_Items: Group[] ;

  IsLoading : boolean ;

  constructor(private GroupProcess : GroupsService ,
              private RoutingProcess : RoutingProcessService) {
    this.Group_Items = [] ;
    this.IsLoading = true ;
  }

  ngOnInit(): void {
    this.GetGroupData();
  }

  public ParserCommandGroup(GroupInfo : {
    GroupID : number ,
    GroupCommand : CommandType
  }) {
    switch (GroupInfo.GroupCommand) {
      case CommandType.GroupEnter :
        this.GetFileGroup(GroupInfo.GroupID) ;
        break ;
      case CommandType.ReportEnter :
        this.GetReport(GroupInfo.GroupID) ;
        break ;
      case CommandType.DeleteGroup :
        this.DeleteGroup(GroupInfo.GroupID) ;
        break ;
    }
  }

  private DeleteGroup(GroupID : number): void {
    this.IsLoading = true ;
    this.GroupProcess.DeleteGroup(GroupID).subscribe(() => {
      this.GetGroupData();
    });
  }

  private GetFileGroup(GroupID : number) {
    this.RoutingProcess.Route2PrivateGroupFile(GroupID);
  }

  private GetGroupData(): void {
    this.GroupProcess.ShowOwnerGroups().subscribe(Value => {
      this.Group_Items = Value ;
      this.IsLoading = false ;
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

  Group_Items: Group[];

  constructor(private GroupProcess : GroupsService) {
    this.Group_Items = [] ;
  }

  ngOnInit(): void {

  }

  ParserCommandGroup(GroupInfo : {
    GroupID : number ,
    GroupCommand : CommandType
  }) {

  }

}
