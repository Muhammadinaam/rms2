import { Component, OnInit } from '@angular/core';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';

@Component({
  selector: 'items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  actionColumn = {
    show: true,
    header: 'Action',
    showEdit: true,
    showDelete: false,
  };

  columns = [
    { header: 'Image', dataName: 'image', modifier: this.imageModifier, },
    { header: 'Category', dataName: 'category', modifier: this.categoryNameModifier, },
    { header: 'Name', dataName: 'name', modifier: null, },
    { header: 'Price', dataName: 'price', modifier: null, },
    { header: 'Information', dataName: 'information', modifier: null, },
    { header: 'Printer', dataName: 'printer', modifier: null, },
    { header: 'Taxable', dataName: 'is_taxable', modifier: this.isActivatedModifier, },
    { header: 'Activated', dataName: 'is_activated', modifier: this.isActivatedModifier, },
  ];

  categoryNameModifier(category)
  {
    return category.name;
  }

  imageModifier(imagePath)
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
