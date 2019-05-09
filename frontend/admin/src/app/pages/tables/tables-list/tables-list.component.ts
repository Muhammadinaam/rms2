import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tables-list',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.scss']
})
export class TablesListComponent implements OnInit {

  actionColumn = {
    show: true,
    header: 'Action',
    showEdit: true,
    showDelete: false,
  };

  columns = [
    { header: 'Name', dataName: 'name', modifier: null, },
    { header: 'Floor', dataName: 'floor', modifier: null, },
    { header: 'Activated', dataName: 'is_activated', modifier: this.isActivatedModifier, },
  ];

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
