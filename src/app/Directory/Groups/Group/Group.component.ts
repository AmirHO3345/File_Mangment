import {Component, Input} from "@angular/core";
import {Group} from "../../../Models/GroupsHandle";
import {DatePipe} from "@angular/common";

@Component({
  selector : 'Group_Item' ,
  templateUrl : './Group.component.html' ,
  styleUrls : ['./Group.component.css']
})
export class GroupComponent {

  Group_Item !: Group ;

  @Input('SetData') set SetGroupData(Item : Group) {
    this.Group_Item = Item ;
  }

  constructor(public DateTransformer: DatePipe) {}

  AddUser() {}

  AddFile() {}

  GetInfo() {}

  OpenGroup() {}

}
