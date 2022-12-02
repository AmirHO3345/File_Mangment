import {Component, OnInit} from "@angular/core";
import {Group} from "../../Models/GroupsHandle";

@Component({
  selector : 'Group-Items' ,
  templateUrl : './Groups.component.html' ,
  styleUrls : ['./Groups.component.css']
})
export class GroupsComponent implements OnInit{

  Group_Items : Group[] ;

  constructor() {
    this.Group_Items = [] ;
  }

  ngOnInit(): void {
    this.Group_Items.push(new Group(1 , 'Test' , {
      id : 1 ,
      name : 'Amir'
    } , new Date()));
    this.Group_Items.push(new Group(1 , 'Test' , {
      id : 1 ,
      name : 'Amir'
    } , new Date()));
    this.Group_Items.push(new Group(1 , 'Test' , {
      id : 1 ,
      name : 'Amir'
    } , new Date()));
    this.Group_Items.push(new Group(1 , 'Test' , {
      id : 1 ,
      name : 'Amir'
    } , new Date()));
    this.Group_Items.push(new Group(1 , 'Test' , {
      id : 1 ,
      name : 'Amir'
    } , new Date()));
    this.Group_Items.push(new Group(1 , 'Test' , {
      id : 1 ,
      name : 'Amir'
    } , new Date()));
    this.Group_Items.push(new Group(1 , 'Test' , {
      id : 1 ,
      name : 'Amir'
    } , new Date()));
    this.Group_Items.push(new Group(1 , 'Test' , {
      id : 1 ,
      name : 'Amir'
    } , new Date()));
    this.Group_Items.push(new Group(1 , 'Test' , {
      id : 1 ,
      name : 'Amir'
    } , new Date()));
  }

  CreateGroup() {}

}
