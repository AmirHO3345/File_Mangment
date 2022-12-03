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
    GroupID : number ,
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
      GroupID : number ,
      GroupCommand : CommandType
    }>() ;
  }

  SendCommand(GroupCommand : CommandType) {
    this.CommandOut.emit({
      GroupID : this.Group_Item.ID ,
      GroupCommand : GroupCommand
    });
  }

  GetAllCommands() {
    return CommandType
  }

}


