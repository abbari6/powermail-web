import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/services/state/auth-state.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  isSignedIn: boolean;

  constructor(
    private auth: AuthStateService,
    private token: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.userAuthState.subscribe(val => {
      this.isSignedIn = val;
  });
  }
    // Signout
    signOut() {
      this.auth.setAuthState(false);
      this.token.removeToken();
      this.router.navigate(['login']);
    
    }

}
