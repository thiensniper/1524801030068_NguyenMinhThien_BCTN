import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
                //   public db: AngularFirestore;
                //   constructor(private http: HttpClient) { }

                //   getAll() {
                //       return this.http.get<User[]>(`${environment.apiUrl}/users`);
                //   }

                //   getById(id: number) {
                //       return this.http.get(`${environment.apiUrl}/users/${id}`);
                //   }

                //   register(user: User) {
                //       return this.db.collection('users').add({
                //           id: user.id,
                //           username: user.username,
                //           password: user.password,
                //           firstName: user.firstName,
                //           lastName: user.lastName
                //       })
                // //      return this.http.post(`${environment.apiUrl}/users/register`, user);
                //   }

                //   update(user: User) {
                //       return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
                //   }

                //   delete(id: number) {
                //       return this.http.delete(`${environment.apiUrl}/users/${id}`);
                //   }
    public db = firebase.database();

    // Chay duoc Observable
    // getAll(): Observable<Qrdata[]> {
    //   return new Observable<Qrdata[]>((observer) => {
    //     var temp = this.db.ref('qrdata');
    //     // get support data from firebase
    //     temp.on('value', function (snapshot) {
    //       var opts = [], i = 0;
    //       snapshot.forEach(function(childSnapshot){
    //         var childData = childSnapshot.val();
    //         console.log(childData);
    //         opts[i++] = childData;
    //       })
    //       observer.next(opts);
    //     }, function (error) {
    //       console.error(error);
    //     });
    //   });
    // }
    
    // chay duoc Promise<any>
    getAll(){
        return new Promise<any>((resolve, reject) => {
        this.db.ref('/user').once('value', function (snapshot){
            var opts = [],i = 0;
            snapshot.forEach(function(childSnapshot){
            // console.log(childSnapshot.val());
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            opts[i++] = childData;
            });
            resolve(opts);
        }, function (error) {
            reject(error);
        })
        })
    }
    
    getOne(qrId){
        return new Promise<any>((resolve, reject) => {
        this.db.ref('/user/' + qrId).once('value', function (snapshot){
            resolve(snapshot.val());
        }, function (error) {
            reject(error);
        })
        })
    }
    
    createQRData(qrdata) {
        return new Promise<any>((resolve, reject) => {
            var temp = {
            idqr : qrdata.idqr,
            context: qrdata.context,
            nameqr: qrdata.nameqr,
            sel1 : qrdata.sel1
        };
        temp = JSON.parse( JSON.stringify(temp));
        firebase.database().ref('user/' + qrdata.idqr).set(temp).then(data => {
            resolve(data);
        }).catch(error => {
            reject(error);
        })
        })
    }
    
    updateQRData(qrdata) {
        return new Promise<any>((resolve, reject) => {
        var temp = {
            content: qrdata.context,
            nameqr: qrdata.nameqr,
            sel1 : qrdata.sel1
        };
        temp = JSON.parse( JSON.stringify(temp));
        firebase.database().ref('user/' + qrdata.idqr).update(temp).then(data => {
            resolve(data);
        }).catch(error => {
            reject(error);
        })
        })
    }
    
    deleteQR(qrId){
        return new Promise<any>((resolve, reject) => {
        this.db.ref('/user/' + qrId).remove().then(data=>{
            console.log('Delete ok');
        }).catch(error => {
            console.log('Delete error');
        })
        })
    }
}
