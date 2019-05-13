import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../../../../admin/src/app/common-services-components/services/base-end-point.service';
import { SettingsService } from '../../../../../admin/src/app/common-services-components/services/settings.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  category;
  basePath = BaseEndPointService.getBaseEndPoint();
  currencyCode = this.settingsService.getCurrencyCode();
  AddToOrderModalVisibility:boolean = false;
  selectedItem = null;
  selectedItemCategory = null;

  

  loading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private settingsService: SettingsService) { }


  ngOnInit() {
    
    this.activatedRoute.params.subscribe( params => {
      if(params.category_name) {

        this.loading = true;
        this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/get-category-with-items?name=' + params.category_name)
          .subscribe(resp => this.category = resp)
          .add(() => this.loading = false);
      }
    });

  }

  setAddToOrderModalVisibility(visibility)
  {
    this.AddToOrderModalVisibility = visibility;
  }

  addToOrderClicked(item, category){
    this.setAddToOrderModalVisibility(true);
    this.selectedItem = item;
    this.selectedItemCategory = category;
  }

}
