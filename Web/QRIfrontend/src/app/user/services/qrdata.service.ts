import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Opt } from 'src/app/models/opt';
import * as firebase from 'firebase';
import { Qrdata } from 'src/app/models/qrdata';
import { AngularFirestore } from '@angular/fire/firestore';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class QrdataService {
  urlDownload: any;
  constructor(
    private http: HttpClient,
    public readonly afs: AngularFirestore
  ) { }

  public db = firebase.database();
  public storageRef = firebase.storage();

    // Create a root reference
  
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
      this.db.ref('/qrdata').once('value', function (snapshot){
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
      this.db.ref('/qrdata/' + qrId).once('value',function (snapshot){
      }, function (error) {} )
      .then(data => {
        console.log(data.val());
        var x = data.child('urlFile');
        // console.log(URL.revokeObjectURL(x.val()));
        // URL.revokeObjectURL(x.val());
        resolve(data.val());
      }).catch(error => {
        reject(error);
      })
    })
  }

  getImage(id){
    return new Promise<any>((resolve, reject) => {
        const storageRef: firebase.storage.Reference = firebase.storage().ref('images/' + id);
        console.log(storageRef.getDownloadURL());
        storageRef.getDownloadURL().then(data => {
          console.log(data);
          resolve(data);
        }).catch(error=>{
          console.log(error);
          reject(error);
        });
      })
  }
  createQRData(qrdata, isImg) {
    return new Promise<any>((resolve, reject) => {

      var today = new Date();
      var tite = {
        title : "Add QR",
        time : today.toString(),
        message : "Creat QRID " + qrdata.idqr + " successful" 
      };
      const key = this.afs.createId();
      console.log(key);
      console.log(today.toString());
      if(isImg){
        const file: File = qrdata.filedata;
        const metaData = { 'contentType':file.type};
        const storageRef: firebase.storage.Reference = firebase.storage().ref('images/' + qrdata.idqr);
        const uploadTask: firebase.storage.UploadTask = storageRef.put(file, metaData);
        storageRef.getDownloadURL().then(data => {
          this.urlDownload = data;
          console.log(data);
        }).catch(error=>{
          console.log(error);
        })
        uploadTask.then(snapshot => {
          console.log("Upload is complete!");
          this.urlDownload = snapshot.metadata.downloadURLs;
          console.log("Download link : ",this.urlDownload);
        })
        uploadTask.catch(error=>{
          reject(error);
          console.log(error);
        })
      }
      
      this.db.ref('history/').push(tite);
      console.log("Data file : ",qrdata.filedata);
      // var file = new File([qrdata.filedata],qrdata.idqr);

      
      
      // var url = URL.createObjectURL(file);
      var temp = {
          idqr : qrdata.idqr,
          context: qrdata.context,
          nameqr: qrdata.nameqr,
          sel1 : qrdata.sel1,
          // urlImage: this.urlDownload
        };
        console.log(temp);
        temp = JSON.parse( JSON.stringify(temp));
        this.db.ref('qrdata/' + qrdata.idqr).set(temp).then(data => {
          resolve(data);
        }).catch(error => {
          reject(error);
        })
    })
  }

  updateQRData(qrdata) {
    return new Promise<any>((resolve, reject) => {
      var today = new Date();
      var tite = {
        title : "Repair QR",
        time : today.toString(),
        message : "Repair QRID " + qrdata.idqr + " successful" 
      };
      const key = this.afs.createId();
      console.log(key);
      this.db.ref('history/').push(tite);

      var file = new File([qrdata.filedata],qrdata.idqr);
      this.storageRef.ref(qrdata.idqr).put(file).then(function(snapshot){
        console.log('Update a blob');

      }).catch(error=>{
        console.log(error);
      });
      // var url = URL.createObjectURL(file);
      
      var temp = {
        idqr : qrdata.idqr,
        context: qrdata.context,
        nameqr: qrdata.nameqr,
        sel1 : qrdata.sel1,
        urlFile : file
      };
      temp = JSON.parse( JSON.stringify(temp));
      firebase.database().ref('qrdata/' + qrdata.idqr).update(temp).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      })
    })
  }

  now : any;
  getHistory(){
    return new Promise<any>((resolve, reject) => {
      this.db.ref('/history').once('value', function (snapshot){
        var Hits = [],i = 0;
        snapshot.forEach(function(childSnapshot){
          // console.log(childSnapshot.val());
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          // console.log(childData);
          Hits[i++] = childData;
        });
        resolve(Hits);
      }, function (error) {
        reject(error);
      })
    })
  }
  deleteQR(qrId){
    return new Promise<any>((resolve, reject) => {
      var today = new Date();
      var tite = {
        title : "Delete QR",
        time : today.toString(),
        message : "Delete QRID " + qrId + " successful",
      };
      this.storageRef.ref('qrdata/' + qrId).delete().then(data=>{
        console.log('Delete ok');
      }).catch(error => {
        console.log('Delete error');
      })
      this.db.ref('history/').push(tite);
      // this.db.ref('qrdata/' + qrdata.idqr).set(temp).then(data => {
      //   resolve(data);
      // }).catch(error => {
      //   reject(error);
      // }),
      this.db.ref('qrdata/' + qrId).remove().then(data=>{
        console.log('Delete ok');
      }).catch(error => {
        console.log('Delete error');
      })
    })
  }


  // getById(id: number) {
  //     return this.http.get(`${environment.apiUrl}/qrdatas/${id}`);
  // }

  // creatQrdata(qrdata: Qrdata) {
  //   console.log(qrdata.nameqr,qrdata.idqr,qrdata.sel1,qrdata.context);
  //     return this.db.collection('qrdata').add({
  //       // id: qrdata.id,
  //       nameqr: qrdata.nameqr,
  //       idqr: qrdata.idqr,
  //       sel1: qrdata.sel1,
  //       context: qrdata.context,
  //       // filedata: qrdata.filedata
  //     })
  // }

  // update(user: Qrdata) {
  //     return this.http.put(`${environment.apiUrl}/qrdatas/${user.id}`, user);
  // }

  // delete(id: number) {
  //     return this.http.delete(`${environment.apiUrl}/qrdatas/${id}`);
  // }
}
