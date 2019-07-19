import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseEndPointService } from '../../../../../../admin/src/app/common-services-components/services/base-end-point.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss'],
})
export class CategoryItemsComponent implements OnInit {

  loading:boolean;
  category;
  basePath = BaseEndPointService.getBaseEndPoint();

  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      if(params.id) {

        this.loading = true;
        this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/get-category-with-items?id=' + params.id)
          .subscribe(resp => this.category = resp)
          .add(() => this.loading = false);
      }
    });
  }

  backToCategories() {
    this.router.navigate(['/tabs/tab-items']);
  }

}
