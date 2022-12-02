import { NgModule } from '@angular/core';
import {RouterModule, Routes, UrlSegment} from '@angular/router';
import {SignInComponent} from "../Authentication/SignIn/SignIn.component";
import {RegisterComponent} from "../Authentication/Register/Register.component";
import {DirectoryComponent} from "../Directory/Directory.component";
import {FilesComponent} from "../Directory/Files/Files.component";
import {GroupsComponent} from "../Directory/Groups/Groups.component";

export function GroupTypeMatcher(url: UrlSegment[]) {
  if (url.length == 1) {
    const path = url[0].path;
    if(path.startsWith('Private')
      || path.startsWith('Included')){
      return {consumed: url};
    }
  }
  return null;
}

const routes: Routes = [
  {path : 'signIn' , component : SignInComponent} ,
  {path : 'signUp' , component : RegisterComponent} ,
  {path : '' , component : DirectoryComponent , children : [
      {path : '' , redirectTo : 'publicGroup' } ,
      {path : 'publicGroup' , component : FilesComponent} ,
      {matcher : GroupTypeMatcher , component : GroupsComponent , children : [
          {path : 'File' , component : FilesComponent } ,
          // {path : 'User' , component : UserComponent}
        ]}
    ]} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
