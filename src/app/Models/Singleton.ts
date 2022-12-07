
export class Singleton {

  static readonly API = 'http://localhost/FilesManagementSystem/public/' ;

  static readonly GlobalGroupID = 1 ;

  static readonly FormName = {
    Email : 'Email' ,
    Password : 'Password' ,
    FirstName : 'First_Name' ,
    LastName : 'Last_Name' ,
    Role : 'Person_Type' ,
    SaveLogin : 'Keep_Login' ,
    FileName : 'File_Name' ,
    FileUpload : 'FileUpload' ,
    NewObject : 'New_Object' ,
    GroupInclude : 'GroupInclude' ,
    GroupNameInput : 'Group_Name'
  } ;

  static readonly RoutingPage = {
    Authentication : {
      SignIn : 'signIn' ,
      SignUp : 'signUp'
    } ,
    Groups : {
      PublicG : 'publicGroup' ,
      PrivateG : 'privateGroup' ,
      IncludedG : 'includedGroup' ,
      MyFiles : 'MyFiles'
    } ,
    Files : 'GroupFile' ,
    Report : 'Report' ,
    ErrorPage : 'SomethingWrong' ,
  } ;

}
