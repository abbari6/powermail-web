import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthStateService } from 'src/app/services/state/auth-state.service';
import { TokenService } from 'src/app/services/token/token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  errors = null;
  userId = null;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })
  constructor(private router: Router, private auth: AuthService, private token: TokenService,
    private authState: AuthStateService
   ) { }
  ngOnInit(): void {
    
  }
  //login user
  loginUser() {
    this.auth.login(this.loginForm.value).subscribe({
      next: result => {
        console.log(result);
        this.responseHandler(result);
      },
      error: error => {
        this.errors = error.error;
      }
    });
  }

  responseHandler(data) {
    this.token.handleData(data.access_token );
    this.userId = data.user.email;
    this.authState.setAuthState(true);
    this.router.navigate(['/user']);
    this.token.handleUserid(data.user.email);
  }
  

}





