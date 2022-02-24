import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/services/state/auth-state.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isSignedIn: boolean;

  constructor(
    private auth: AuthStateService
  ) { }

  ngOnInit(): void {
    this.auth.userAuthState.subscribe(val => {
      this.isSignedIn = val;
  });
  }

}
