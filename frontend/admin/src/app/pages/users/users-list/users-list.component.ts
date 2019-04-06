import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  actionColumn = {
    show: true,
    header: 'Action',
    showEdit: true,
    showDelete: false,
  };

  columns = [
    { header: 'Name', dataName: 'name', modifier: null, },
    { header: 'User ID', dataName: 'userid', modifier: null, },
    { header: 'Email', dataName: 'email', modifier: null, },
    { header: 'User Type', dataName: 'user_type', modifier: null, },
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
