import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../services/base-end-point.service';

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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/categories?withitems=1&withoptions=1&all=1')
      .subscribe(categories => {
        this.allCategories = categories;
        this.searchCategory();
        this.searchItem();
      });
  }

  selectCategory(category){
    this.selectedCategory = category;
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

  showAddToOrderModal(item){
    this.selectedItem = item;

    this.selectedItemCategory = this.allCategories.find(x => x.id == item.category_id);

    this.AddToOrderModalVisibility = true;
  }

  itemAddedToOrderHandler(){
    this.itemAddedToOrder.emit();
  }

}
