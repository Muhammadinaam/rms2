import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../services/base-end-point.service';

@Component({
  selector: 'categories-items-search',
  templateUrl: './categories-items-search.component.html',
  styleUrls: ['./categories-items-search.component.scss']
})
export class CategoriesItemsSearchComponent implements OnInit {
  basePath = BaseEndPointService.getBaseEndPoint();
  categories;
  selectedCategory = null;
  items = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/categories?withitems=1&all=1')
      .subscribe(categories => {
        this.categories = categories;
        this.generateItemsList;
      });
  }

  selectCategory(category){
    this.selectedCategory = category;
  }

  generateItemsList(){
    this.items = [];
    
  }

}
