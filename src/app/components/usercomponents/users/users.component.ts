import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
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
  constructor(    private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.auth.profileUser().subscribe((data: any) => {
      console.log(data);
      this.UserProfile = data;
    })
  }

}
