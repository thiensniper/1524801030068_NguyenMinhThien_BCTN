import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { Opt } from 'src/app/models/opt';
import { OptService } from '../opt.service';
import { Qrdata } from 'src/app/models/qrdata';
import { QrdataService } from 'src/app/user/services/qrdata.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/share/services/alert.service';
import * as firebase from 'firebase';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-detail-qr',
  templateUrl: './detail-qr.component.html',
  styleUrls: ['./detail-qr.component.css']
})
export class DetailQrComponent implements OnInit {
  
  addForm: FormGroup;
  loading = false;
  submitted = false;
  opt$ : Observable<Qrdata>;
  reader = new FileReader();
  urlImg;
  // Create a reference with an initial file path and name
  storage = firebase.storage();
  pathReference = this.storage.ref(this.urlImg);

  // public storageRef = firebase.storage();
  
  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string = '';

  //  opt = {
  //    "nameqr" : "1",
  //    "idqr" : "1",
  //    "sel1" : "1",
  //    "context" : "abs"
  //  }
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private service: OptService
    private service: QrdataService,
    private alertService: AlertService,
  ) {
    this.value = location.pathname.replace('/managedqr/list/','');
    this.storage.ref().child(this.value).getDownloadURL().then(function(url) {
      // `url` is the download URL for 'images/stars.jpg'
    
      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
      // this.urlImg = url;
    }).catch(function(error) {
      // Handle any errors
    });
  }

  ngOnInit() {
    this.service.getImage(location.pathname.replace('/managedqr/list/','')).then(data=>{
      this.urlImg = data;
    }).catch(error=>{
      console.log(error);
    });
    this.opt$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getOne(params.get('id')))
    )
  }
  delete(){
    console.log(location.pathname.replace('/managedqr/list/',''));
    this.service.deleteQR(location.pathname.replace('/managedqr/list/',''));
    alert("Delete QR successful");
    this.router.navigate(['/managedqr/list']);
  }
}
