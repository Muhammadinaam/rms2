import { Component, OnInit } from '@angular/core';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  actionColumn = {
    show: true,
    header: 'Action',
    showEdit: true,
    showDelete: false,
  };

  columns = [
    { header: 'Image', dataName: 'image', modifier: this.categoryImage, },
    { header: 'Name', dataName: 'name', modifier: null, },
    { header: 'Information', dataName: 'information', modifier: null, },
    { header: 'Activated', dataName: 'is_activated', modifier: this.isActivatedModifier, },
  ];

  categoryImage(imagePath)
  {
    return `<img class="maxwidth200" src="${BaseEndPointService.getBaseEndPoint()}/images/${imagePath}">`;
  }

  isActivatedModifier(is_activated)
  {
    if(is_activated == 1)
    {
      return '<span class="badge badge-success">Yes</span>';
    }
    return '<span class="badge badge-danger">No</span>';
  }

  constructor( ) {  }

  ngOnInit() {
  }

}
