import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../common-services-components/services/order.service';
import { SettingsService } from '../../../common-services-components/services/settings.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.scss']
})
export class OrderAddEditComponent implements OnInit {

  order;
  freeTables;
  editingId: any;

  searchModalVisible = false;
  loading: boolean;

  constructor(
    private orderService: OrderService,
    public settingsService: SettingsService,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.orderService.reset();
    this.order = this.orderService.order;

    this.loading = true;
    


    this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/free-tables')
      .subscribe(data => {
        this.freeTables = data;
        this.loadEditingOrder();
        this.loading = false;
        
      }, 
      error => {
        alert("Error occurred in loading Tables Data");
      });

    
  }

  loadEditingOrder() {
    this.activatedRoute.params.subscribe( params => {
        if(params.id) {
            this.editingId = params.id;

            this.orderService.edit(this.editingId)
                .subscribe(resp => {
                  this.orderService.order = resp;
                  this.order = this.orderService.order;

                  this.setMappings();

                });
        }
      });
  }

  private setMappings(){
    this.orderService.order['order_type_idt'] = 
      this.settingsService.orderTypes.find(x => x.id == this.order.order_type_id).idt;

    this.order.tables.forEach(table => {
      if(this.freeTables == null){
        this.freeTables = [];
      }
      this.freeTables.push(table);
      this.freeTables = this.freeTables.slice();
      
    });

    this.order.items.forEach(item => {
      item.id = item.item_id;

      item.options.forEach(option => {
        option.id = option.option_id;

        option.options_items.forEach(option_item => {
          option_item.id = option_item.option_item_id;
        });

      });

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

  onSubmit(){
    let observable = this.orderService.saveOrder();

    if(observable != null)
    {
      observable.subscribe(resp => {
        let message = '';

        if(resp['message']){
          message = resp['message'];
        }

        if(resp['success'] == true){
          message = 'Order Saved Successfully. '
        }

        if(resp['order_number'])
        {
          message += 'Order Number: ' + resp['order_number'];
        }
        alert(message);

        if(resp['success'] == true){
          this.orderService.reset();
          this.router.navigate(['pages/orders-and-tables']);
        }
      });
    }
  }

  showSearch(show:boolean){
    this.searchModalVisible = show;
  }

}
