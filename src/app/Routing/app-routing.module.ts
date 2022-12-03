import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "../Authentication/SignIn/SignIn.component";
import {RegisterComponent} from "../Authentication/Register/Register.component";
import {DirectoryComponent} from "../Directory/Directory.component";
import {ErrorPageComponent} from "../Error/ErrorPage.component";
import {GroupsIncludedComponent, GroupsPrivateComponent} from "../Directory/Groups/Groups.component";
import {GlobalFilesComponent, PrivateFilesComponent} from "../Directory/Files/Files.component";


const routes: Routes = [
  {path : 'signIn' , component : SignInComponent } ,
  {path : 'signUp' , component : RegisterComponent } ,
  {path : '' , component : DirectoryComponent , children : [
      {path : '' , redirectTo : 'publicGroup' , pathMatch : "full" } ,
      {path : 'GroupFile' , redirectTo : 'publicGroup' , pathMatch : "full" } ,
      {path : 'publicGroup' , component : GlobalFilesComponent} ,
      {path : 'privateGroup' , component : GroupsPrivateComponent} ,
      {path : 'includedGroup' , component : GroupsIncludedComponent} ,
      {path : 'GroupFile/:id' , component : PrivateFilesComponent} ,
    ]} ,
  {path : '**' , component : ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
