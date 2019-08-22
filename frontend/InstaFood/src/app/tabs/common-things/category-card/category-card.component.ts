import { Component, OnInit, Input } from '@angular/core';
import { BaseEndPointService } from '../../../../../../admin/src/app/common-services-components/services/base-end-point.service';
import { Router } from '@angular/router';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {

  @Input()
  category

  basePath = BaseEndPointService.getBaseEndPoint();

  constructor(private router: Router) { }

  ngOnInit() {}

  categoryClicked(category_id) {
    this.router.navigate(['/tabs/tab-items/category/' + category_id + '/items']);
  }

}
