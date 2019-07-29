import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../services/base-end-point.service';
import { OrderService } from '../../services/order.service';
import { AddToOrderComponent } from '../add-to-order/add-to-order.component';

@Component({
  selector: 'categories-items-search',
  templateUrl: './categories-items-search.component.html',
  styleUrls: ['./categories-items-search.component.scss']
})
export class CategoriesItemsSearchComponent implements OnInit {
  basePath = BaseEndPointService.getBaseEndPoint();
  allCategories;
  selectedCategory = null;
  categories = [];
  items = [];
  
  searchCategoryText = "";
  searchItemText = "";

  selectedItem;
  selectedItemCategory;
  AddToOrderModalVisibility;

  @Output() itemAddedToOrder = new EventEmitter();

  @ViewChild('addToOrderComp')
  addToOrderComp: AddToOrderComponent;

  constructor(private http: HttpClient, public orderSerivce: OrderService) { }

  ngOnInit() {
    this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/categories?withitems=1&withoptions=1&all=1')
      .subscribe(categories => {
        this.allCategories = categories;
        this.searchCategory();
        this.searchItem();
      });
  }

  selectCategory(category){
    
    if(this.selectedCategory != null && this.selectedCategory['id'] == category['id']){
      this.selectedCategory = null;
    }
    else{
      this.selectedCategory = category;
    }

    this.searchItem();
  }

  clearCategorySearch(){
    this.searchCategoryText = "";
    this.searchCategory();
    this.searchItem();
  }

  searchCategory(){
    this.selectedCategory = null;
    this.categories = [];
    this.allCategories.forEach(category => {
      if(category.name.toLowerCase().includes(this.searchCategoryText.toLowerCase())){
        this.categories.push(category);
      }
    });
  }

  clearItemSearch(){
    this.searchItemText = "";
    this.searchItem();
  }

  searchItem(){
    this.items = [];
    let itemsToBeSearched = [];
    
    if(this.selectedCategory != null){
      itemsToBeSearched = this.selectedCategory.items;
    }
    else{
      this.allCategories.forEach(category => {
        category.items.forEach(item => {
          itemsToBeSearched.push(item);
        });
      });
    }

    itemsToBeSearched.forEach(item => {
      if(item.name.toLowerCase().includes(this.searchItemText)){
        this.items.push(item);
      }
    });
  }

  itemClicked(item) {

    this.selectedItem = item;
    this.selectedItemCategory = this.allCategories.find(x => x.id == item.category_id);

    if(this.orderSerivce.showPopupBeforeAddingItem) {
      this.showAddToOrderModal(item);
    } else {

      this.addToOrderComp.item = this.selectedItem;
      this.addToOrderComp.category = this.selectedItemCategory;
      
      
      this.addToOrderComp.reset();

      this.addToOrderComp.addItemInOrder();
      
    }

  }

  showAddToOrderModal(item){
    

    this.AddToOrderModalVisibility = true;
  }

  itemAddedToOrderHandler(){
    this.itemAddedToOrder.emit();
  }

}
