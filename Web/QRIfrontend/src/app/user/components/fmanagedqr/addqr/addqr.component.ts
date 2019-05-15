import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/services/authentication.service';
import { QrdataService } from 'src/app/user/services/qrdata.service';
import { AlertService } from 'src/app/share/services/alert.service';
// import { first } from 'rxjs/operators';
import { Qrdata } from 'src/app/models/qrdata';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-addqr',
  templateUrl: './addqr.component.html',
  styleUrls: ['./addqr.component.css']
})

export class AddqrComponent implements OnInit {

  addForm: FormGroup;
  loading = false;
  submitted = false;
  items: Array<any>;
  
  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string = '';
  checkUpdateAvatar: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private qrdataService: QrdataService,
    private alertService: AlertService,
    public readonly afs: AngularFirestore
  ) { }

  ngOnInit() {
    const key = this.afs.createId();
    this.value = key;
    this.addForm = this.formBuilder.group({
      nameqr: ['', Validators.required],
      idqr: [key, Validators.required],
      context: ['', Validators.required],
      filedata: [],
      sel1: ['Văn bản']
    });

    // Observable
    // this.qrdataService.getAll()
    // .subscribe(result => {
    //   this.items = result;
    //   console.log(result);
    // })

    // this.qrdataService.getOne(4).then(data => {
    //   console.log(data);
    // }).catch(error => {
    //   console.log(error);
    // });

  }

  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }

  onFileSelected(event) {
    this.checkUpdateAvatar = true;
    this.addForm.value.filedata = <File>event.target.files[0];
    if (this.addForm.value.filedata.size <= 10000000) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            reader.onload = function (e: any) {
                // $('#avatar').attr('src', e.target.result);
                // console.log($('#avatar').attr('src'));
            };
            reader.readAsDataURL(this.addForm.value.filedata);
        }
    } else {
        alert('Image is too large! Close!');
        this.checkUpdateAvatar = false;
    }
}

  private qrdata: Qrdata;
  private c: Boolean;
  onSubmit() {
    // this.qrdataService.deleteQR(4).then(data => {
    //   console.log(data);
    // }).catch(function(error) {
    //   console.log(error);
    // })
    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    this.qrdata = this.addForm.value;
    console.log(this.qrdata.filedata);
    var isImg = true;
    if(this.qrdata.filedata == null){
      isImg = false;
    }
    // console.log(this.qrdata.nameqr, this.qrdata.idqr, this.qrdata.sel1, this.qrdata.context);
    this.loading = true;
    console.log(this.qrdataService.getOne(this.qrdata.idqr));
    this.qrdataService.createQRData(this.addForm.value,isImg).then(data => {
      alert("Add QR successful");
      this.alertService.success('Add QR successful', true);
      this.router.navigate(['/managedqr']);
    }).catch(error => {
      alert("Add QR failed");
      this.loading = false;
      this.ngOnInit();
      this.router.navigate(['/managedqr/addqr']);
      console.log(error)
    }) 

    // this.qrdataService.createQRData(this.addForm.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             this.alertService.success('Add QR successful', true);
    //             this.router.navigate(['/managedqr']);
    //         },
    //         error => {
    //             this.alertService.error(error);
    //             this.loading = false;
    //         });
  }
}
