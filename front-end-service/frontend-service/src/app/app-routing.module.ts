import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ShowContactsComponent } from './show-contacts/show-contacts.component';
import { UpdateComponent } from './update/update.component';
import { SearchComponent } from './search/search.component';
import { DeleteComponent } from './delete/delete.component';
import { SettingComponent } from './setting/setting.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"success/:id",component:ProfileComponent,children:[
    {path:"",component:DashboardComponent},
    {path:"dashboard",component:DashboardComponent},
    {path:"showContacts",component:ShowContactsComponent},
    {path:"addContact",component:AddContactComponent},
    {path:"search",component:SearchComponent},
    {path:"delete",component:DeleteComponent},
    {path:"settings",component:SettingComponent},
    {path:"update",component:UpdateComponent},
    {path:"updateContact",component:UpdateContactComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
