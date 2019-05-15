import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/share/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // opts = this.authenticationService.getCurrent();
  opts = [{
    "displayName" : "Đoàn Công Chính", 
    "birth": "23/01/1999",
    "phoneNumber": "0933798706",
    "email": "admin@qri.com",
    "providerId": "123456@abc"
  }];

  constructor( 
    private authenticationService : AuthenticationService,
  ) { }
  ngOnInit() {

  }

}
