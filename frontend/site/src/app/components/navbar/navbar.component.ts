import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../../../../admin/src/app/common-services-components/services/base-end-point.service';
import { Router } from '@angular/router';
import { MenuModalService } from 'src/app/services/menu-modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuModalVisibility = false;
  categories:any = [];
  mobileMenuVisibility: boolean = false;
  loading: boolean;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private menuModalService: MenuModalService) { 
      
      this.menuModalService.visibilityChanged$.subscribe(
        visibility => {
          this.menuModalVisibility = visibility;
        });
    }

  ngOnInit() {
    this.loading = true;
    this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/categories?all=1')
      .subscribe(resp => {
        this.categories = resp;
      }).add(() => {
        this.loading = false;
      });
  }

  setMenuModalVisibility(visibility)
  {
    this.menuModalService.changeVisibility(visibility);
  }

  menuClicked(categoryName)
  {
    this.setMenuModalVisibility(false);
    this.router.navigate(['/menu/' + categoryName.toLowerCase()]);
  }

  burgerClicked()
  {
    this.mobileMenuVisibility = !this.mobileMenuVisibility;
  }

}
