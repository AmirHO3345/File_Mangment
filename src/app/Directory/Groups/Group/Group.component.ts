import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CommandType, Group} from "../../../Models/GroupsHandle";
import {DatePipe} from "@angular/common";

@Component({
  selector : 'Group_Item' ,
  templateUrl : './Group.component.html' ,
  styleUrls : ['./Group.component.css']
})
export class GroupComponent {

  Group_Item !: Group ;

  private readonly CommandOut : EventEmitter<{
    GroupItem : Group ,
    GroupCommand : CommandType
  }> ;

  @Input('SetData') set SetGroupData(Item : Group) {
    this.Group_Item = Item ;
  }

  @Output('GetCommand') get GetCommand() {
    return this.CommandOut ;
  }

  constructor(public DateTransformer: DatePipe) {
    this.CommandOut = new EventEmitter<{
      GroupItem : Group ,
      GroupCommand : CommandType
    }>() ;
  }

  SendCommand(GroupCommand : CommandType) {
    this.CommandOut.emit({
      GroupItem : this.Group_Item ,
      GroupCommand : GroupCommand
    });
  }

  GetAllCommands() {
    return CommandType
  }

}


