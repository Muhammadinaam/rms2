import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { SettingsService } from '../../services/settings.service';
import { AddToOrderComponent } from '../add-to-order/add-to-order.component';

@Component({
  selector: 'order-items-amounts',
  templateUrl: './order-items-amounts.component.html',
  styleUrls: ['./order-items-amounts.component.scss']
})
export class OrderItemsAmountsComponent implements OnInit {

  currencyCode = this.settingsService.getCurrencyCode();

  @Input() order;
  @Input() small = false;
  showDetails = false;

  @ViewChild('addToOrderComp')
  addToOrderComp: AddToOrderComponent;

  constructor(private orderService: OrderService,
    private settingsService: SettingsService) { }

  ngOnInit() {
  }

  itemChanged() {
    this.orderService.calculateOrderAmounts();
  }

  addToQty(item, qtyToAdd) {
    let quantity = +item.quantity;
    item.quantity = quantity + +qtyToAdd;

    if(item.quantity <= 0) {
      item.quantity = 1;
    }

    this.orderService.calculateOrderAmounts();
  }

  deleteItem(item_index) {
    let res = confirm("Are you sure you want to delete this item?");

    if(res == true) {
      this.orderService.deleteItem(item_index);
    }
  }

  editClicked(item) {
    this.addToOrderComp.isEditingExistingItem = true;
    this.addToOrderComp.orderItem = item;
    this.addToOrderComp.editingItemId = item['id'];

    this.addToOrderComp.setModalVisibility(true);
  }

}
