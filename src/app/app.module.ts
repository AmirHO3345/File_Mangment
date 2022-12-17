import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './Routing/app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RegisterComponent} from "./Authentication/Register/Register.component";
import {SignInComponent} from "./Authentication/SignIn/SignIn.component";
import {NavigationComponent} from "./Navigation/Navigation.component";
import {ObjectCreateComponent} from "./ObjectCreate/ObjectCreate.component";
import {SelectorComponent} from "./Component/Selector/Selector.component";
import {DirectoryComponent} from "./Directory/Directory.component";
import {GroupComponent} from "./Directory/Groups/Group/Group.component";
import {LoaderComponent} from "./Component/Loader/Loader.component";
import {ReportComponent} from "./Report/Report.component";
import {FileComponent} from "./Directory/Files/File/File.component";
import {DatePipe} from "@angular/common";
import {ErrorPageComponent} from "./Error/ErrorPage.component";
import {AllWebSiteGroups, GroupsIncludedComponent, GroupsPrivateComponent} from "./Directory/Groups/Groups.component";
import {
  AllWebSiteFiles,
  GlobalFilesComponent,
  MyFilesComponent,
  PrivateFilesComponent
} from "./Directory/Files/Files.component";
import {ProcessPopupComponent} from "./Component/ProcessPopup/ProcessPopup.component";
import {UserComponent} from "./Directory/Users/User/User.component";
import {UsersGlobalComponent, UsersPrivateComponent} from "./Directory/Users/Users.component";

@NgModule({
  declarations: [
    AppComponent ,
    RegisterComponent ,
    SignInComponent ,
    NavigationComponent ,
    ObjectCreateComponent ,
    SelectorComponent ,
    DirectoryComponent ,
    GroupComponent ,
    GroupsPrivateComponent ,
    GroupsIncludedComponent ,
    LoaderComponent ,
    ReportComponent ,
    FileComponent ,
    GlobalFilesComponent ,
    PrivateFilesComponent ,
    ErrorPageComponent ,
    ProcessPopupComponent ,
    MyFilesComponent ,
    AllWebSiteFiles ,
    AllWebSiteGroups ,
    UserComponent ,
    UsersPrivateComponent ,
    UsersGlobalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule ,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
