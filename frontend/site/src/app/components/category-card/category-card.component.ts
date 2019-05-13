import { Component, OnInit, Input } from '@angular/core';
import { BaseEndPointService } from '../../../../../admin/src/app/common-services-components/services/base-end-point.service';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

  @Input()
  category;

  basePath = BaseEndPointService.getBaseEndPoint();

  constructor() { }

  ngOnInit() {
  }

}
