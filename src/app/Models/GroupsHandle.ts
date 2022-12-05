
export interface GroupComponent {

  Group_Items : Group[] ;

  ParserCommandGroup(GroupInfo : {
    GroupItem : Group ,
    GroupCommand : CommandType
  }) : void ;

}

export class Group {

  readonly ID : number ;

  readonly Name : string ;

  readonly Admin : {
    ID : number ,
    Name : string
  } ;

  private Permission !: {
    CanReport : boolean ,
    CanDelete : boolean ,
  }

  readonly Date_Create : Date ;

  constructor(id : number , name : string , admin : {
    id : number ,
    name : string ,
    isAdmin ?: boolean
  } ,  create : Date) {
    this.ID = id ;
    this.Name = name ;
    this.Admin = {
      ID : admin.id ,
      Name : admin.name
    } ;
    this.Date_Create = create ;
  }

  public SetPermission(PermissionGrant : {
    Report : boolean ,
    Delete : boolean
  }) {
    if(this.Permission === undefined)
      this.Permission = {
        CanReport : PermissionGrant.Report ,
        CanDelete : PermissionGrant.Delete
      } ;
  }

  public GetPermission() {
    return {...this.Permission} ;
  }

}

export enum CommandType {
  GroupEnter ,
  ReportEnter ,
  DeleteGroup
}
