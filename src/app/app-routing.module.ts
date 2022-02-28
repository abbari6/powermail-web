import { NgModule } from '@angular/core';
import { RouterModule, Routes , CanActivate} from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component'; 
import { RegisterComponent } from './components/auth/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactsComponent } from './components/usercomponents/contacts/contacts.component';
import { UserNavbarComponent } from './components/usercomponents/user-navbar/user-navbar.component';
import { UsersComponent } from './components/usercomponents/users/users.component';
import { AuthGuard } from './services/guard/auth.guard';
const routes: Routes = [
  {path:'',  redirectTo:'/user', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'user', component:UsersComponent, canActivate:[AuthGuard] },
  {path:'contacts',component: ContactsComponent,canActivate:[AuthGuard]},
  {path:'navbar',component:UserNavbarComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
