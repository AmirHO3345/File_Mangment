
export class Person {

  readonly ID : number ;

  readonly Name : string ;

  readonly Email : string ;

  private readonly TypePerson : PersonType ;

  private Token : string ;

  constructor(id : number , name : string , email : string , personType : number , token : string) {
    this.ID = id ;
    this.Name = name ;
    this.Email = email ;
    this.Token = token ;
    if(personType == 1)
      this.TypePerson = PersonType.Admin ;
    else
      this.TypePerson = PersonType.User ;
  }

  public getToken() {
    return `Bearer ${this.Token}` ;
  }

  public setToken(token : string) {
    if(this.Token === undefined)
      this.Token = token ;
  }

  public getTypePerson() {
    return (this.TypePerson == PersonType.User) ?
      'User' : 'Admin' ;
  }

}

export class User {

  readonly ID : number ;

  readonly Name : string ;

  readonly Email : string ;

  readonly Role : PersonType ;

  private Permission !: {
    CanDelete : boolean
  }

  constructor(id : number , name : string , email : string , role : 'Admin' | 'User') {
    this.ID = id ;
    this.Name = name ;
    this.Email = email ;
    this.Role = (role === "Admin")? PersonType.Admin : PersonType.User ;
  }

  public SetPermission(PermissionGrant : {CanDelete : boolean}) {
    if(this.Permission === undefined)
      this.Permission = PermissionGrant ;
  }

  public GetPermission() {
    return {...this.Permission} ;
  }

}

export enum PersonType {
  User ,
  Admin
}

export enum CommandUser {
  DeleteUser
}
