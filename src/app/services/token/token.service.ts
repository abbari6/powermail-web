import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private issuer = {
    login: 'http://localhost:8000/api/auth/login',
    register: 'http://localhost:8000/api/auth/register'
  }

  constructor(
    private router: Router

  ) {
    console.log(this.getUserid())
  }

  handleUserid(userId) {
    localStorage.setItem('userid', userId);
  }
  getUserid() {
    return localStorage.getItem('userid');
  }

  handleData(token) {
    localStorage.setItem('auth_token', token);
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  // Verify the token
  isValidToken() {
    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
      }
    } else {
      return false
      
    }
  }

  payload(token) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
    this.router.navigate(['user']);
  }

  // Remove token
  removeToken() {
    localStorage.clear();
   // localStorage.removeItem('userid');
  }

}



