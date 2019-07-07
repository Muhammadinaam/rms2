import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import cloneDeep from 'lodash/cloneDeep';
//import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../services/settings.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'add-to-order',
  templateUrl: './add-to-order.component.html',
  styleUrls: ['./add-to-order.component.css']
})
export class AddToOrderComponent implements OnInit, OnChanges {

  currencyCode = this.settingsService.getCurrencyCode();

  singleOptions = {};
  multipleOptions = {};

  
  @Input() item;
  @Input() category;
  @Input() isVisible;
  @Output() isVisibleChange:EventEmitter<any> = new EventEmitter<any>();
  @Output() itemAddedToOrder:EventEmitter<any> = new EventEmitter<any>();
  @Input() showAlertOnItemAdd = true;
  
  orderItem = {
    category_id: '',
    category_name: '',
    category_image: '',
    id: '',
    name: '',
    printer: '',
    is_taxable: true,
    price: 0,
    image: '',
    instructions: '',
    quantity: 1,
    options: [],
    item_price_with_options: 0,
    item_total_price: 0,
  };

  orderItemReset;

  constructor(
    private settingsService: SettingsService,
    private orderService: OrderService,
    //private toastr: ToastrService
    ) { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.orderItemReset = this.orderItem;
    this.reset();
  }

  addToQty(qty)
  {
    this.orderItem.quantity += qty;
    this.orderItem.quantity = this.orderItem.quantity <= 0 ? 1 : this.orderItem.quantity;
  }  

  setModalVisibility(visibility)
  {
    this.isVisible = visibility;
    this.isVisibleChange.emit(this.isVisible);

    this.reset();
  }

  reset()
  {
    this.singleOptions = {};
    this.multipleOptions = {};
    
    this.orderItem = this.orderItemReset;
    this.orderItem.quantity = 1;
    this.orderItem.instructions = '';
    this.orderItem.item_price_with_options = 0;
    if(this.item)
    {
      this.orderItem.id = this.item.id;
      this.orderItem.name = this.item.name;
      this.orderItem.price = this.item.price;
      this.orderItem.image = this.item.image;
      this.orderItem.printer = this.item.printer;
      this.orderItem.is_taxable = this.item.is_taxable;
    }

    if(this.category)
    {
      this.orderItem.category_id = this.category.id;
      this.orderItem.category_name = this.category.name;
      this.orderItem.category_image = this.category.image;
    }
  }

  optionsChanged()
  {
    this.updateOrderItem();
  }

  updateOrderItem()
  {
    this.orderItem.options = [];
    this.orderItem.item_total_price = 0;
    this.orderItem.item_price_with_options = 0;
    this.orderItem.item_price_with_options = +this.orderItem.price; // price without options

    this.category.options.forEach(option => {
      var optionToAdd = {};
      optionToAdd['options_items'] = [];
      optionToAdd['id'] = option.id;
      optionToAdd['name'] = option.name;
      option.options_items.forEach(option_item => {
        
        
        
        if(option.type == 'Single'){
          Object.keys(this.singleOptions).forEach(singleOptionKey => {
            if(option.id == singleOptionKey && option_item.id == this.singleOptions[singleOptionKey])
            {
              optionToAdd['options_items'].push(option_item);
              this.orderItem.item_price_with_options += +option_item.price;
            }
          })
        }
        else if(option.type == 'Multiple'){
          Object.keys(this.multipleOptions).forEach(multipleOptionKey => {
            if(option_item.id == multipleOptionKey && this.multipleOptions[multipleOptionKey])
            {
              optionToAdd['options_items'].push(option_item);
              this.orderItem.item_price_with_options += +option_item.price;
            }
          })
        }

      })

      this.orderItem.item_total_price = this.orderItem.item_price_with_options * this.orderItem.quantity;
      if(optionToAdd['options_items'].length > 0)
      {
        this.orderItem.options.push(optionToAdd);
      }

    });
  }

  addItemInOrder()
  {
    if( Number.isInteger(this.orderItem.quantity) == false )
    {
      return 'Item quantity is not correct';
    }

    this.updateOrderItem();
    var orderItem = cloneDeep(this.orderItem);
    this.orderService.addItemInOrder(orderItem);
    this.setModalVisibility(false);
    this.itemAddedToOrder.emit();
    this.reset();

    // this.toastr.success("Item added to Order. Click \"Your Order\" Button at Top to Checkout", '', {
    //   positionClass: 'toast-bottom-center',
    //   timeOut: 15000,
    // });

    if(this.showAlertOnItemAdd){
      alert("Item added to Order. Click \"Your Order\" Button/Tab to Checkout");
    }
  }

}
