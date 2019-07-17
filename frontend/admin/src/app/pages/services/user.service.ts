import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataServiceInterface } from '../classes/DataServiceInterface';
import { BaseEndPointService } from '../../common-services-components/services/base-end-point.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements DataServiceInterface {
  
  constructor(private http: HttpClient) { }
  
  insert(data: any) {
    return this.http.post(BaseEndPointService.getBaseEndPoint() + '/api/users', data);
  }
  edit(id: any) {
    return this.http.get(BaseEndPointService.getBaseEndPoint() + `/api/users/${id}/edit`);
  }
  update(data: any, id: any) {
    return this.http.put(BaseEndPointService.getBaseEndPoint() + `/api/users/${id}`, data);
  }
  delete(id: any) {
    alert("Method not implemented.");
  }

  permissions = {
    'Users Management':
    [
      {'idt' : 'users-list', 'title' : 'View Users List'},
        {'idt' : 'add-users', 'title' : 'Add Users'},
        {'idt' : 'edit-users', 'title' : 'Edit Users'},
    ],
    'Categories Management' :
    [
        {'idt' : 'categories-list', 'title' : 'View Categories List'},
        {'idt' : 'add-categories', 'title' : 'Add Categories'},
        {'idt' : 'edit-categories', 'title' : 'Edit Categories'},
    ],
    'Items Management' :
    [
        {'idt' : 'items-list', 'title' : 'View Items List'},
        {'idt' : 'add-items', 'title' : 'Add Items'},
        {'idt' : 'edit-items', 'title' : 'Edit Items'},
    ],
    'Orders Management' :
    [
        {'idt' : 'add-orders', 'title' : 'Add Orders'},
        {'idt' : 'edit-orders', 'title' : 'Edit Orders'},
        {'idt' : 'close-orders', 'title' : 'Close Orders'},
        {'idt' : 'cancel-orders', 'title' : 'Cancel Orders'},
        {'idt' : 'give-discount', 'title' : 'Give Discount'},
    ],
    'Reports and Settings' :
    [
      {'idt' : 'settings', 'title' : 'Settings'},
      {'idt' : 'sales-report', 'title' : 'Sales Report'},
    ]
  };

  getUsers(pageNumber, search)
  {
    return this.http.get(BaseEndPointService.getBaseEndPoint() + `/api/users?page=${pageNumber}&search=${search}`);
  }

  getAllPermissions()
  {
    return this.permissions;
  }
}
