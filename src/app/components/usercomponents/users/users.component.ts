import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthStateService } from 'src/app/services/state/auth-state.service';
import { TokenService } from 'src/app/services/token/token.service';
export class User {
  name: String;
  email: String;
  id: number;
  mobile: string;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  UserProfile: User;
  constructor(    private auth: AuthService , private authState: AuthStateService, 
    private token: TokenService,
    private router: Router
    ) { }

    
  ngOnInit(): void {
   this.profileUser();
  }
profileUser(){
  this.auth.profileUser().subscribe((data: any) => {
    console.log(data);
    this.UserProfile = data;
  })
}
// signOut() {
//   this.authState.setAuthState(false);
//   this.token.removeToken();
//   this.router.navigate(['login']);

// }
}
