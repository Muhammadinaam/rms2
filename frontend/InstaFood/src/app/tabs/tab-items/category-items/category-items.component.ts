import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseEndPointService } from '../../../../../../admin/src/app/common-services-components/services/base-end-point.service';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../../../../../../admin/src/app/common-services-components/services/settings.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss'],
})
export class CategoryItemsComponent {

  loading:boolean;
  category;
  basePath = BaseEndPointService.getBaseEndPoint();
  currency;
  AddToOrderModalVisibility: any;
  selectedItem: any;
  selectedItemCategory: any;
  salesTaxRate: number;

  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private settingsService: SettingsService,
    public toastController: ToastController) { }

  ionViewDidEnter() {
    this.activatedRoute.params.subscribe( params => {
      if(params.id) {

        this.loading = true;
        this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/get-category-with-items?id=' + params.id)
          .subscribe(resp => this.category = resp)
          .add(() => this.loading = false);
      }
    });

    this.currency = this.settingsService.getSettingFromArray('currency-code');
    this.salesTaxRate = +this.settingsService.getSalesTaxPercent();
  }

  backToCategories() {
    this.router.navigate(['/tabs/tab-items']);
  }

  setAddToOrderModalVisibility(visibility)
  {
    this.AddToOrderModalVisibility = visibility;
  }

  addToOrderClicked(item, category){
    this.setAddToOrderModalVisibility(true);
    this.selectedItem = item;
    this.selectedItemCategory = category;
  }

  async itemAddedToOrder() {
    const toast = await this.toastController.create({
      message: 'Item added to Order. Please check [Your Order] tab.',
      duration: 3000,
      animated: true,
      color: "success",
      position: "middle",
      translucent: false,
      showCloseButton: true
    });
    toast.present();
  }
}
