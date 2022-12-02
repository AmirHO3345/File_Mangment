
export class Person {

  readonly ID : number ;

  readonly Name : string ;

  readonly Email : string ;

  private readonly TypePerson : PersonType ;

  private readonly Token : string ;

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

  public getTypePerson() {
    return (this.TypePerson == PersonType.User) ?
      'User' : 'Admin' ;
  }

}

export enum PersonType {
  User ,
  Admin
}
