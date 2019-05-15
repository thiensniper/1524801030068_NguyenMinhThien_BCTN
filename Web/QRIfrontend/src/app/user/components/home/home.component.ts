import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subscription, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/share/services/authentication.service';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  opts = [
    { "id": "profile", "name": "Thông tin cá nhân" },
    { "id": "managedqr", "name": "Quản lý mã QR" }
  ];

  constructor(
      private route: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService
  ) {
    //   this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
    //       this.currentUser = user;
    //   });
  }

  ngOnInit() {
    //   this.loadAllUsers();
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      // this.currentUserSubscription.unsubscribe();
  }
}
