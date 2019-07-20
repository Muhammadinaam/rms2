import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../../admin/src/app/common-services-components/services/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../../../../admin/src/app/common-services-components/services/settings.service';

@Component({
  selector: 'order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent implements OnInit {

  visibility:boolean;
  order;
  loading = false;

  currencyCode = this.settingsService.getCurrencyCode();
  
  constructor(
    private orderService: OrderService,
    public settingsService: SettingsService,
    private router: Router,
    private toastr: ToastrService) { }
  
  ngOnInit() {
    this.orderService.orderModalVisibilityChanged$
      .subscribe(visibility => {
        this.visibility = visibility;
      })

    this.order = this.orderService.order;
  }
  
  setModalVisibility(visibility){
    this.visibility = visibility;
  }

  deleteItem(item_index){
    if(confirm("Are you sure to delete this item?"))
    {
      this.orderService.deleteItem(item_index);
    }
  }

  orderSaved() {
    this.visibility = false;
    this.toastr.show("Order Saved");
  }

}
