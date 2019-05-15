import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Opt } from 'src/app/models/opt'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OptService } from '../opt.service';
import { switchMap } from 'rxjs/operators';
import { QrdataService } from 'src/app/user/services/qrdata.service';
import { Options } from 'selenium-webdriver/firefox';
import { Qrdata } from 'src/app/models/qrdata';
import { Observer } from 'firebase';

@Pipe({
  name: 'grdFilter'
})

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public searchText: string;
  opts: any;
  selectedId: string;
  items: Array<any>;

  // opts$ = this.qrdataService.getAll()
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  // opts = this.qrdataService.getAll().subscribe(
  //     result => { 
  //       this.opts = result;
  //        console.log(this.opts);
  //     }
  //   )

  constructor(
    private service: OptService,
    private route: ActivatedRoute,
    private qrdataService: QrdataService
  ) { }

  ngOnInit() {
    this.qrdataService.getAll().then(data => {
      this.opts = data;
      // console.log(data);
    }).catch(erorr => {
      console.log(erorr);
    });
        // this.opts = this.route.paramMap.pipe(
        //   switchMap(params => {
        //     this.selectedId = params.get('id');
        //     return this.service.getOpts();
        // this.opts = this.qrdataService.getAll()
        // .subscribe(result => {
        //     this.items = result;
        //     console.log(result);
        //  })
     
        //  })
        // )
//    console.log(this.opts);
  }
  // ngOnInit() {
  //   this.opts$ = this.route.paramMap.pipe(
  //     switchMap(params => {
  //       this.selectedId = params.get('id');
  //       return this.service.getOpts();
  //     })
  //   )
  // }
}
