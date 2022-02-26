import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})

export class AuthStateService {

  private userState = new BehaviorSubject<boolean>(this.token.isLoggedIn());
  userAuthState = this.userState.asObservable();

  constructor(
    public token: TokenService , private router: Router
  ) { }

  setAuthState(value: boolean) {
    this.router.navigate(['user'])
    this.userState.next(value);

  }

}
