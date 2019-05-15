import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../common-services-components/services/order.service';
import { SettingsService } from '../../../common-services-components/services/settings.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';

@Component({
  selector: 'order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.scss']
})
export class OrderAddEditComponent implements OnInit {

  order;
  freeTables;


  constructor(
    private orderService: OrderService,
    private settingsService: SettingsService,
    private http: HttpClient) { }

  ngOnInit() {
    this.order = this.orderService.order;
    this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/free-tables')
      .subscribe(data => {
        this.freeTables = data;
      });
  }

  addTable(){

    console.log(this.order.tables);
    if(this.freeTables.length == 0){
      alert('No free tables found');
      return;
    }

    if(this.order.tables == null)
    {
      this.order.tables = [];
    }

    this.order.tables.push(this.freeTables[0]);
  }

  removeTable(index){
    this.order.tables.splice(index, 1);
  }

}
