import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "../Authentication/SignIn/SignIn.component";
import {RegisterComponent} from "../Authentication/Register/Register.component";
import {DirectoryComponent} from "../Directory/Directory.component";
import {ErrorPageComponent} from "../Error/ErrorPage.component";
import {GroupsIncludedComponent, GroupsPrivateComponent} from "../Directory/Groups/Groups.component";
import {GlobalFilesComponent, PrivateFilesComponent} from "../Directory/Files/Files.component";
import {Singleton} from "../Models/Singleton";
import {AuthenticationGuard} from "../Authentication/Authentication.guard";


const routes: Routes = [
  {path : `${Singleton.RoutingPage.Authentication.SignIn}` , component : SignInComponent } ,
  {path : `${Singleton.RoutingPage.Authentication.SignUp}` , component : RegisterComponent } ,
  {path : '' , component : DirectoryComponent , children : [
      {path : '' , redirectTo : `${Singleton.RoutingPage.Groups.PublicG}` , pathMatch : "full" } ,
      {path : `${Singleton.RoutingPage.Files}` , redirectTo : `${Singleton.RoutingPage.Groups.PublicG}` , pathMatch : "full" } ,
      {path : `${Singleton.RoutingPage.Groups.PublicG}` , component : GlobalFilesComponent} ,
      {path : `${Singleton.RoutingPage.Groups.PrivateG}` , component : GroupsPrivateComponent} ,
      {path : `${Singleton.RoutingPage.Groups.IncludedG}` , component : GroupsIncludedComponent} ,
      {path : `${Singleton.RoutingPage.Files}/:id` , component : PrivateFilesComponent} ,
    ] , canActivate : [AuthenticationGuard]} ,
  {path : `${Singleton.RoutingPage.ErrorPage}` , component : ErrorPageComponent } ,
  {path : '**' , redirectTo : `${Singleton.RoutingPage.ErrorPage}` , pathMatch : "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
