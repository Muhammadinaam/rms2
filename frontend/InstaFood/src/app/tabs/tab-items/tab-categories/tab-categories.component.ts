import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../../../../../admin/src/app/common-services-components/services/base-end-point.service';

@Component({
  selector: 'app-tab-categories',
  templateUrl: './tab-categories.component.html',
  styleUrls: ['./tab-categories.component.scss'],
})
export class TabCategoriesComponent implements OnInit {

  loading:boolean;
  categories;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.loading = true;
    this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/categories?all=1')
      .subscribe(resp => {
        this.categories = resp;
      }).add(() => {
        this.loading = false;
      });

  }

}
