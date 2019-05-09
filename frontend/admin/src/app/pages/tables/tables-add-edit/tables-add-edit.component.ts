import { Component, OnInit } from '@angular/core';
import { GenericAddEdit } from '../../classes/GenericAddEdit';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericDataService } from '../../classes/GenericDataService';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../../services/base-end-point.service';

@Component({
  selector: 'tables-add-edit',
  templateUrl: './tables-add-edit.component.html',
  styleUrls: ['./tables-add-edit.component.scss']
})
export class TablesAddEditComponent extends GenericAddEdit {

  data: any = {
    name: '',
    floor: '',
    is_activated: true,
  };

  constructor(
    private activatedRoute: ActivatedRoute, 
    private genericService: GenericDataService,
    private http: HttpClient,
    private router: Router) {

    super(activatedRoute, genericService, http, router);
    this.genericService.url = BaseEndPointService.getBaseEndPoint() + "/api/tables"
  }

  allFloors;

  ngOnInit() {

    super.ngOnInit();
    console.log(this.editingId);
    this.redirectPathAfterAddEdit = '/pages/tables';

    this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/floors')
      .subscribe(resp => {
        this.allFloors = resp;
      });
  }

  onSubmit()
  {
    super.onSubmit();
  }

  floorBtnClicked(floor){
    this.data.floor = floor;
  }
}
