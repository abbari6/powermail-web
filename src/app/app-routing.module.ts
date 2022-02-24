import { NgModule } from '@angular/core';
import { RouterModule, Routes , CanActivate} from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component'; 
import { RegisterComponent } from './components/auth/register/register.component';
import { ContactsComponent } from './components/usercomponents/contacts/contacts.component';
import { UsersComponent } from './components/usercomponents/users/users.component';
import { AuthGuard } from './services/guard/auth.guard';
const routes: Routes = [
  {path:'', component:UsersComponent, pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'user', component:UsersComponent, canActivate:[AuthGuard] },
  {path:'contacts',component: ContactsComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
