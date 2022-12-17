import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CommandUser, User} from "../../../Models/Person";

@Component({
  selector : 'User_Item' ,
  templateUrl : './User.component.html' ,
  styleUrls : ['./User.component.css']
})export class UserComponent {

  ItemUser !: User ;

  private readonly CommandOut : EventEmitter<{
    Item : User ,
    Command : CommandUser
  }> ;

  @Output('GetCommand') get GetCommand() {
    return this.CommandOut ;
  }

  @Input('UserData') set SetUser(UserInsert : User) {
    this.ItemUser = UserInsert ;
  }

  constructor() {
    this.CommandOut = new EventEmitter<{Item: User; Command: CommandUser}>() ;
  }

  SendCommand(UserCommand : CommandUser) {
    this.CommandOut.emit({Item : this.ItemUser
      , Command : UserCommand }) ;
  }

  GetAllCommand() {
    return CommandUser ;
  }

}
