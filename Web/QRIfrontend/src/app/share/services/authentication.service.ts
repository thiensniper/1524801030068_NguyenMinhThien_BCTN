import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { tokenKey } from '@angular/core/src/view';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    user:firebase.User;

  constructor(public afAuth: AngularFireAuth, public router: Router, public alertService: AlertService) {
      this.afAuth.authState.subscribe(user => {
          if (user) {
              this.user = user;
              sessionStorage.setItem('currentUser', JSON.stringify(this.user));
          } else {
              sessionStorage.setItem('currentUser', null);
          }
      })
  }

//   public get currentUserValue(): User {
//       return this.currentUserSubject.value;
//   }

  /**
   * isLoggedOn check if user has loged in
   * 
   */
  public isLoggedOn(): boolean {
      if(JSON.parse(sessionStorage.getItem('currentUser')) !== null) {
          return true;
      } else return false;
  }

  public getCurrent() : any {
    console.log(JSON.parse(sessionStorage.getItem('currentUser')).providerData);
    return JSON.parse(sessionStorage.getItem('currentUser')).providerData;
  }
//   login(username: string, password: string) {
//       return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
//           .pipe(map(user => {
//               // login successful if there's a jwt token in the response
//               if (user && user.token) {
//                   // store user details and jwt token in local storage to keep user logged in between page refreshes
//                   sessionStorage.setItem('currentUser', JSON.stringify(user));
//                   this.currentUserSubject.next(user);
//               }

//               return user;
//           }));
//   }

//   logout() {
//       // remove user from local storage to log user out
//       localStorage.removeItem('currentUser');
//       this.currentUserSubject.next(null);
//   }

  public async login(email: string, password: string) {
      try {
          await this.afAuth.auth.signInWithEmailAndPassword(email, password);
          this.alertService.success('Login success!');
          this.router.navigate(['/']);
          window.location.reload();
      } catch(e) {
          this.alertService.error("Error! " + e.message);
      }
  }
  public async logout() {
      await this.afAuth.auth.signOut();
      sessionStorage.clear();
      window.location.reload();
  }
}
