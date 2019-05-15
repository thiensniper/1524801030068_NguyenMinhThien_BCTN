import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managedqr',
  templateUrl: './managedqr.component.html',
  styleUrls: ['./managedqr.component.css']
})
export class ManagedqrComponent implements OnInit {

  constructor() { }
  opts = [
    { "id": "managedqr/addqr", "name": "Thêm mã QR" },
    { "id": "managedqr/list", "name": "Danh sách mã QR đã thêm" },
    { "id": "managedqr/history", "name": "Lịch sử" }
  ];
  ngOnInit() {
  }

}
