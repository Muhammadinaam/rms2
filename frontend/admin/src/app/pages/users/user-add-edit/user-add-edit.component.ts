import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { GenericAddEdit } from '../../classes/GenericAddEdit';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent extends GenericAddEdit {

  allPermissions;

  data: any = {
    email: '',
    password: '',
    user_type: 'Admin',
    is_activated: true,
    permissions: {},
  };

  constructor(
    private activatedRoute: ActivatedRoute, 
    private userService: UserService,
    private http: HttpClient,
    private router: Router) {
    super(activatedRoute, userService, http, router);
  }

  ngOnInit() {

    super.ngOnInit();
    
    this.allPermissions = this.userService.getAllPermissions();
    console.log(this.allPermissions);

    console.log(this.editingId);
    this.redirectPathAfterAddEdit = '/pages/users';
  }
}
