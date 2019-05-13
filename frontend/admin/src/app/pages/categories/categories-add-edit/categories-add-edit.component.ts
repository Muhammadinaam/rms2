import { Component, OnInit } from '@angular/core';
import { GenericAddEdit } from '../../classes/GenericAddEdit';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericDataService } from '../../classes/GenericDataService';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';

@Component({
  selector: 'categories-add-edit',
  templateUrl: './categories-add-edit.component.html',
  styleUrls: ['./categories-add-edit.component.scss']
})
export class CategoriesAddEditComponent extends GenericAddEdit {

  categoryImageUrl;
  data: any = {
    image: '',
    options: [],
    is_activated: true,
  };

  constructor(
    private activatedRoute: ActivatedRoute, 
    private genericService: GenericDataService,
    private http: HttpClient,
    private router: Router) {

    super(activatedRoute, genericService, http, router);
    this.genericService.url = BaseEndPointService.getBaseEndPoint() + "/api/categories"
    this.imagesFolder = "categories";
  }

  ngOnInit() {

    super.ngOnInit();
    console.log(this.editingId);
    this.redirectPathAfterAddEdit = '/pages/categories';
  }

  afterModalLoad(){
    if(this.data.image != null || this.data.image != '')
    {
      this.categoryImageUrl = BaseEndPointService.getBaseEndPoint() + '/images/' + this.data.image;
    }
  }

}
