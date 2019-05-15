import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { QrdataService } from '../../services/qrdata.service';
import { Qrdata } from 'src/app/models/qrdata';

@Injectable({
  providedIn: 'root'
})
export class OptService {

  qrdataService: QrdataService;
  opts: Qrdata[];
  constructor(
    
  ) { }
  // Observable
  //  getOpts() : Observable<Opt[]>{ 
  //   this.qrdataService.getAll()
  //   .subscribe(result => {
  //     this.items = result;
  //     console.log(result);
  //   })
  // }

  getOpts() : Observable<Qrdata[]> {
    // TODO: send the message _after_ fetching the heroes
    //this.messageService.add('HeroService: fetched heroes');
    // this.qrdataService.getAll()
    //   .subscribe(result => {
    //       console.log(result);
    //    })
     return of(this.opts);
  }

  getOpt(id: string){
    return this.getOpts().pipe(
      map((opts: Qrdata[]) => opts.find(opt => opt.idqr === id))
    );
  }
}
