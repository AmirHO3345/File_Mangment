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
import {GroupsComponent} from "./Directory/Groups/Groups.component";
import {LoaderComponent} from "./Component/Loader/Loader.component";
import {ReportComponent} from "./Report/Report.component";
import {FileComponent} from "./Directory/Files/File/File.component";
import {FilesComponent} from "./Directory/Files/Files.component";
import {DatePipe} from "@angular/common";

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
    GroupsComponent ,
    LoaderComponent ,
    ReportComponent ,
    FileComponent ,
    FilesComponent
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
