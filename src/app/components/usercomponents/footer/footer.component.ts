import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/services/state/auth-state.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isSignedIn: boolean;

  constructor( private auth: AuthStateService) { }

  ngOnInit(): void {
    this.auth.userAuthState.subscribe(val => {
      this.isSignedIn = val;
  });
  }

}
