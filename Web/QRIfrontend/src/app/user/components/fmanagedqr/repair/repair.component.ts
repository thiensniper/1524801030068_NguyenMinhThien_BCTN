import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from 'src/app/share/services/authentication.service';
import { QrdataService } from 'src/app/user/services/qrdata.service';
import { AlertService } from 'src/app/share/services/alert.service';
import { first } from 'rxjs/operators';
import { Qrdata } from 'src/app/models/qrdata';
import { Opts } from 'src/app/user/mockAPI/mock-opts';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  addForm: FormGroup;
  loading = false;
  submitted = false;
  id:any;
  opts:Qrdata;
  opt = new Qrdata();
  nameqr: FormControl;
  idqr: FormControl;
  sel1: FormControl;
  filedata: FormControl;
  context: FormControl;
  value : string = '';
  checkUpdateAvatar: boolean;

  constructor(
    private dataqr: Qrdata,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private qrdataService: QrdataService,
    private alertService: AlertService,
    private route: ActivatedRoute,
  ) {
    this.value = location.pathname.replace('/managedqr/repair/','');
    this.id = location.pathname.replace('/managedqr/repair/',''),
    this.qrdataService.getOne(this.id)
      .then(data=>{console.log(data),this.opt=data})
      .catch(erorr=>console.log(erorr))
    // this.nameqr = new FormControl('',[Validators.required]);
    // this.idqr = new FormControl(this.opt.idqr,[]);
    // this.sel1 = new FormControl(this.opt.sel1,[]);
    // this.filedata = new FormControl(this.opt.filedata,[]);
    // this.context = new FormControl(this.opt.context,[]);
    // console.log(this.opt.nameqr);
    // this.addForm = formBuilder.group({
    //   nameqr: this.nameqr,
    //   idqr: this.idqr,
    //   sel1: this.sel1,
    //   filedata: this.filedata,
    //   context: this.context
    // })
  }
  ngOnInit() {
    // this.qrdataService.getOne(this.id)
    //   .then(data=>{console.log(data),this.opt=data})
    //   .catch(erorr=>console.log(erorr))
    this.addForm = this.formBuilder.group({
      nameqr: [, Validators.required],
      idqr: [this.value, Validators.required],
      context: [, Validators.required],
      filedata: [],
      sel1: ['Văn bản']
    })
    

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
  get f() { return this.addForm.value; }

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
    this.qrdata = this.addForm.value;
    if(this.qrdata.nameqr==null){
      this.addForm.value.nameqr=this.opt.nameqr;
    }
    if(this.qrdata.idqr==null){
      this.addForm.value.idqr=this.opt.idqr;
    }
    if(this.qrdata.context==null){
      this.addForm.value.context=this.opt.context;
    }
    var isImg = true;
    if(this.qrdata.filedata==null){
      isImg = false;
      this.addForm.value.filedata=this.opt.filedata;
    }
    console.log(this.qrdata);
    this.loading = true;
    console.log(this.qrdataService.getOne(this.qrdata.idqr));
    this.qrdataService.createQRData(this.addForm.value,isImg).then(data => {
      alert("Repair QR successful");
      this.alertService.success('Repair QR successful', true);
      this.router.navigate(['/managedqr']);
    }).catch(error => {
      alert("Repair QR failed");
      this.loading = false;
      this.ngOnInit();
      this.router.navigate(['/managedqr/list']);
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
