import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginComponent } from './user/components/login/login.component';

import { AuthenticationService } from './share/services/authentication.service';
import { User } from './models/user';

@Component({ 
    selector: 'app', 
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentUser: User;
    constructor(
        private route: Router,
        private authenticationService: AuthenticationService,
        private location: Location,
    ) {
        // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    }

    logout() {
        this.authenticationService.logout();
        this.route.navigate(['/login']);
    }

    goBack(): void {
        this.location.back();
    }
    // onSelect(opt){
    //     this.route.navigate([opt.id]);
    //   }
}