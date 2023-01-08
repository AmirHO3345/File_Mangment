import {Component, OnInit} from "@angular/core";
import {CommandUser, User} from "../../Models/Person";
import {ErrorHandlerManual, FactoryErrors} from "../../Models/ErrorHandler";
import {UsersService} from "./Users.service";
import {Group} from "../../Models/GroupsHandle";
import {LoaderService} from "../../Component/Loader/Loader.service";
import {RoutingProcessService} from "../../Routing/RoutingProcess.service";
import {ProcessPopupService} from "../../Component/ProcessPopup/ProcessPopup.service";

export abstract class UsersComponent {

  User_Items : User[] ;

  Error_Handle : ErrorHandlerManual ;

  constructor(protected UserProcess : UsersService ,
              protected LoadingProcess : LoaderService ,
              protected RoutingProcess : RoutingProcessService) {
    this.User_Items = [] ;
    this.Error_Handle = FactoryErrors.GetErrorObject({User : true}) ;
  }

  public abstract ParserCommandGroup(UserInfo : {
    UserItem : User ,
    UserCommand : CommandUser
  }) : void ;

  protected abstract InitialData () : void ;

  protected abstract UpdateData () : void ;

}


@Component({
  templateUrl : './Users.component.html' ,
  styleUrls : ['./Users.component.css']
})
export class UsersPrivateComponent extends UsersComponent
  implements OnInit {

  MainGroup !: Group ;

  constructor(protected override UserProcess : UsersService ,
              protected override LoadingProcess : LoaderService ,
              protected override RoutingProcess : RoutingProcessService ,
              private PopupProcess : ProcessPopupService) {
    super(UserProcess , LoadingProcess , RoutingProcess) ;
  }

  ngOnInit(): void {
    this.InitialData() ;
  }

  ParserCommandGroup(UserInfo : {
    UserItem : User ,
    UserCommand : CommandUser
  }): void {
    switch (UserInfo.UserCommand) {
      case CommandUser.DeleteUser :
        this.DeleteUser(UserInfo.UserItem.ID) ;
        break ;
    }
  }

  protected InitialData(): void {
    this.LoadingProcess.ActiveTask();
    const CurrentUrl = this.RoutingProcess.CurrentURl() ;
    this.UserProcess.GetPrivateGroupUser(+CurrentUrl[CurrentUrl.length-1])
      .subscribe(Value => {
        this.MainGroup = Value.GroupObject ;
        this.User_Items = Value.GroupUsers ;
        this.LoadingProcess.DoneTask() ;
      } , ErrorValue => {
        this.Error_Handle.Error_Server(ErrorValue) ;
        if(this.Error_Handle.ErrorOccur.Error_Position
          === this.Error_Handle.ErrorType().Group)
          this.RoutingProcess.Route2Error404() ;
        this.LoadingProcess.DoneTask() ;
      });
  }

  protected UpdateData(): void {
    this.InitialData() ;
  }

  private DeleteUser(UserID : number) {
    this.LoadingProcess.ActiveTask() ;
    this.UserProcess.OutUser(this.MainGroup.ID , [UserID]).subscribe(() => {
      this.UpdateData() ;
    } , ErrorValue => {
      this.Error_Handle.Error_Server(ErrorValue) ;
      this.PopupProcess.ViewPopup("Error", this.Error_Handle.ErrorOccur.Error_Message) ;
      this.LoadingProcess.DoneTask() ;
    });
  }

}


@Component({
  templateUrl : './Users.component.html' ,
  styleUrls : ['./Users.component.css']
})
export class UsersGlobalComponent extends UsersComponent
  implements OnInit {

  constructor(protected override UserProcess : UsersService ,
              protected override LoadingProcess : LoaderService ,
              protected override RoutingProcess : RoutingProcessService ) {
    super(UserProcess , LoadingProcess  , RoutingProcess);
  }

  ngOnInit(): void {
    this.InitialData() ;
  }

  ParserCommandGroup({}): void {

  }

  protected InitialData(): void {
    this.LoadingProcess.ActiveTask() ;
    this.UserProcess.GetAllUsers().subscribe(Value => {
      this.User_Items = Value ;
      this.LoadingProcess.DoneTask() ;
    } , ErrorHandle => {
      this.LoadingProcess.DoneTask() ;
    });
  }

  protected UpdateData(): void {
    this.InitialData() ;
  }

}
