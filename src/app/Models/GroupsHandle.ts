
export class Group {

  readonly ID : number ;

  readonly Name : string ;

  readonly Admin !: {
    id : number ,
    name : string
  } ;

  readonly Date_Create : Date ;

  constructor(id : number , name : string , admin : {
    id : number ,
    name : string
  } ,  create : Date) {
    this.ID = id ;
    this.Name = name ;
    this.Admin = admin ;
    this.Date_Create = create ;
  }

}
