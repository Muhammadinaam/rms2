import { Component, OnInit } from '@angular/core';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';

@Component({
  selector: 'receipttypes-list',
  templateUrl: './receipttypes-list.component.html',
  styleUrls: ['./receipttypes-list.component.scss']
})
export class ReceipttypesListComponent implements OnInit {

  actionColumn = {
    show: true,
    header: 'Action',
    showEdit: true,
    showDelete: false,
  };

  columns = [
    { header: 'Name', dataName: 'name', modifier: null, },
    { header: 'Amount Can Be More Than Bill', dataName: 'amount_can_be_more_than_bill', modifier: this.yesNoModifier, },
    { header: 'Customer Name Required', dataName: 'customer_name_required', modifier: this.yesNoModifier, },
    { header: 'Auto Add in Receipt', dataName: 'auto_add', modifier: this.yesNoModifier, },
    { header: 'Activated', dataName: 'is_activated', modifier: this.yesNoModifier, },
  ];

  categoryImage(imagePath)
  {
    return `<img class="maxwidth200" src="${BaseEndPointService.getBaseEndPoint()}/images/${imagePath}">`;
  }

  yesNoModifier(is_activated)
  {
    if(is_activated == 1)
    {
      return '<span class="badge badge-success">Yes</span>';
    }
    return '<span class="badge badge-danger">No</span>';
  }

  constructor() { }

  ngOnInit() {
  }

}
