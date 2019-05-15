import { Component, OnInit } from '@angular/core';
import { QrdataService } from 'src/app/user/services/qrdata.service';
import { Opt } from 'src/app/models/opt';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  hits : any;
  constructor(
    private qrdataService: QrdataService
  ) { }
  
  // opts = this.qrdataService.getAll()
  //       .then(data => {
  //         console.log(data);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });

  ngOnInit() {
    this.qrdataService.getHistory().then(data => {
      console.log(data);
      this.hits = data.reverse();
    }).catch(erorr => {
      console.log(erorr);
    });
  }
  trackByFn(opt) {
    return opt.time;
  }
}
