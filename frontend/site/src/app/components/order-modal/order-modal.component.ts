import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private settingsService: SettingsService,
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
      this.orderService.order.items.splice(item_index, 1);
      this.orderService.calculateOrderAmounts();
    }
  }

  saveOrder()
  {
    if(
      this.order.customer_name == '' ||
      this.order.customer_address == '' ||
      this.order.customer_phone == '')
    {
      alert('Please provide Name, Address and Phone');
      return;
    }

    if(this.orderService.minimumOrderAmount > this.order.order_amount_before_discount)
    {
      alert('Minimum Order Amount is ' 
      + this.orderService.minimumOrderAmount 
      + ', please add more items');
      return;
    }

    this.loading = true
    this.orderService.saveOrder()
      .subscribe(data => {
        if(data['success'] == true)
        {
          this.orderService.order.items = [];
          this.toastr.success("Order Saved Successfully", '', {
            positionClass: 'toast-bottom-center',
          });
          this.router.navigate(['/track-order', data['tracking_number']])
          this.visibility = false;
        }
        else
        {
          alert(data['message']);
        }
      },
      (error) => {
        alert('Error occurred, please try again');
      })
      .add(() => this.loading = false);
  }

}
