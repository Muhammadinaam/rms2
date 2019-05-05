import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../../services/base-end-point.service';

@Component({
  selector: 'open-orders-and-tables',
  templateUrl: './open-orders-and-tables.component.html',
  styleUrls: ['./open-orders-and-tables.component.scss']
})
export class OpenOrdersAndTablesComponent implements OnInit {

  orders;
  
  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/orders')
      .subscribe(data => {
        this.orders = data;
        console.log(this.orders);
      });

  }

}
