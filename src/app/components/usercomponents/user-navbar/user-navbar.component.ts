import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthStateService } from 'src/app/services/state/auth-state.service';
import { TokenService } from 'src/app/services/token/token.service';
import { User } from '../users/users.component';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  isSignedIn: boolean;
  name: String;
  UserProfile: any;
  constructor(
    private auth: AuthStateService,
    private token: TokenService,
    private router: Router,
    private authh: AuthService
  ) { }

  ngOnInit(): void {
   
    this.auth.userAuthState.subscribe(val => {
      this.isSignedIn = val;
  });
   this.profileUser();
  }
  profileUser()
  {
    this.authh.profileUser().subscribe((data: any) => {
      console.log(data);
      this.UserProfile = data;
    })
  }
    // Signout
    signOut() {
      this.auth.setAuthState(false);
      this.token.removeToken();
      this.router.navigate(['login']);
    
    }

}
