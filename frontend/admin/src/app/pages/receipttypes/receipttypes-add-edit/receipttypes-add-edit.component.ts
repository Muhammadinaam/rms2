import { Component, OnInit } from '@angular/core';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericDataService } from '../../classes/GenericDataService';
import { HttpClient } from '@angular/common/http';
import { GenericAddEdit } from '../../classes/GenericAddEdit';

@Component({
  selector: 'receipttypes-add-edit',
  templateUrl: './receipttypes-add-edit.component.html',
  styleUrls: ['./receipttypes-add-edit.component.scss']
})
export class ReceipttypesAddEditComponent extends GenericAddEdit {

  data: any = {
    name: '',
    amount_can_be_more_than_bill: false,
    customer_name_required: false,
    auto_add: false,
    is_activated: true,
  };

  constructor(
    private activatedRoute: ActivatedRoute, 
    private genericService: GenericDataService,
    private http: HttpClient,
    private router: Router) {

    super(activatedRoute, genericService, http, router);
    this.genericService.url = BaseEndPointService.getBaseEndPoint() + "/api/receipttypes"
  }

  ngOnInit() {
    super.ngOnInit();
    console.log(this.editingId);
    this.redirectPathAfterAddEdit = '/pages/receipttypes';
  }

}
