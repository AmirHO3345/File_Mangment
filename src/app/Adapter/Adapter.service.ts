import {Injectable} from "@angular/core";
import {Group} from "../Models/GroupsHandle";
import {Person, PersonType, User} from "../Models/Person";
import {FileResponse, ReportResponse} from "../Directory/Files/Files.service";
import {FileFactory} from "../Models/FilesHandle";
import {GroupResponse} from "../Directory/Groups/Groups.service";
import {Report} from "../Models/ReportHandle";
import {UserResponse} from "../Directory/Users/Users.service";

export interface PersonResponse {
  data : {
    user : {
      created_at : string ;
      email : string ;
      id : number ;
      name : string ;
      role : string ;
      token : string ;
      updated_at : string ;
    }
  }
}

@Injectable({providedIn : 'root'})
export class AdapterService {

  public Convert2Account(PersonData : PersonResponse) {
    const Role = (PersonData.data.user.role == "user")? PersonType.User : PersonType.Admin ;
    return  new Person(+PersonData.data.user.id , PersonData.data.user.name , PersonData.data.user.email
      , Role , PersonData.data.user.token) ;
  }

  public Convert2Group(DataResponse : GroupResponse) {
    const CurrentGroup = new Group (
      DataResponse.id ,
      DataResponse.name ,
      {
        id : DataResponse.user.id ,
        name : DataResponse.user.name
      } ,
      new Date(DataResponse.created_at)
    );
    return CurrentGroup
  }

  public Convert2File(DataResponse : FileResponse , GroupContainer ?: Group) {
    let Booking = undefined ;
    if(!!DataResponse.user_bookings && DataResponse.user_bookings.length != 0)
      Booking = {
        UserID : DataResponse.user_bookings[0].id ,
        UserName : DataResponse.user_bookings[0].name
      } ;
    return FileFactory.CreateFile({
      ID : DataResponse.id ,
      Path : DataResponse.path ,
      FileName : DataResponse.name ,
      Owner : {
        ID : DataResponse.user.id ,
        Name : DataResponse.user.name
      } ,
      Created_Date : new Date(DataResponse.created_at) ,
      User_Booking : Booking
    } , 'Text') ;
  }

  public Convert2User(DataResponse : UserResponse) {
    const RoleType = (DataResponse.role === 'user')? 'User' : 'Admin' ;
    return new User(DataResponse.id , DataResponse.name , DataResponse.email ,
      RoleType) ;
  }

  public Convert2ReportFile(DataResponse : ReportResponse[]) {
    let ReportCreate = new Report() ;
    ReportCreate.SetNames(['User_ID' , 'User_Name'
      , 'BookingDate' , 'UnBookingDate']) ;
    DataResponse.forEach(Value => {
      ReportCreate.SetValue([Value.id_user_booking.toString() , Value.name_user_booking ,
        Value.booking_date , Value.unbooking_date]);
    });
    return ReportCreate ;
  }

}
