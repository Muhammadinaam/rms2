import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericDataService } from '../../classes/GenericDataService';
import { HttpClient } from '@angular/common/http';
import { GenericAddEdit } from '../../classes/GenericAddEdit';
import { BaseEndPointService } from '../../../services/base-end-point.service';

@Component({
  selector: 'items-add-edit',
  templateUrl: './items-add-edit.component.html',
  styleUrls: ['./items-add-edit.component.scss']
})
export class ItemsAddEditComponent extends GenericAddEdit {

  itemImageUrl;
  data: any = {
    image: '',
    is_activated: true,
  };

  constructor(
    private activatedRoute: ActivatedRoute, 
    private genericService: GenericDataService,
    private http: HttpClient,
    private router: Router) {

    super(activatedRoute, genericService, http, router);
    this.genericService.url = BaseEndPointService.getBaseEndPoint() + "/api/items"
    this.imagesFolder = "items";
  }

  allCategories;

  ngOnInit() {

    super.ngOnInit();
    console.log(this.editingId);
    this.redirectPathAfterAddEdit = '/pages/items';

    this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/categories?all=1')
      .subscribe(resp => {
        this.allCategories = resp;
      });
  }

  onSubmit()
  {
    if(this.data['price'] <= 0)
    {
      alert('Price should be more than 0');
      return;
    }
    super.onSubmit();
  }

  afterModalLoad(){
    if(this.data.image != null || this.data.image != '')
    {
      this.itemImageUrl = BaseEndPointService.getBaseEndPoint() + '/images/' + this.data.image;
    }
  }

}
