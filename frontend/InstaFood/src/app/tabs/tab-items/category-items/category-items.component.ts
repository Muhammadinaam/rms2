import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseEndPointService } from '../../../../../../admin/src/app/common-services-components/services/base-end-point.service';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../../../../../../admin/src/app/common-services-components/services/settings.service';
import { ToastController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss'],
})
export class CategoryItemsComponent implements OnInit {

  loading:boolean;
  category;
  basePath = BaseEndPointService.getBaseEndPoint();
  currency;
  AddToOrderModalVisibility: any;
  selectedItem: any;
  selectedItemCategory: any;
  salesTaxRate: number;
  isOptionsModalVisible:boolean = false;

  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private settingsService: SettingsService,
    public toastController: ToastController,
    private network: Network) {
      this.network.onDisconnect().subscribe(() => {
        this.settingsService.initialized = false;
        window.location.reload();
      });
    }

  ngOnInit(): void {
    this.refresh();
  }

  ionViewDidEnter() {

    this.refresh();
  }

  private refresh() {
    this.network.onDisconnect().subscribe(() => {
      this.settingsService.initialized = false;
      window.location.reload();
    });
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
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

  itemAddedToOrder() {

    // const toast = await this.toastController.create({
    //   message: 'Item added to Order. Please check [Your Order] tab.',
    //   duration: 3000,
    //   animated: true,
    //   color: "success",
    //   position: "middle",
    //   translucent: false,
    //   showCloseButton: true
    // });
    // toast.present();

    this.isOptionsModalVisible = true;

  }

  addMoreItemsClicked() {
    this.isOptionsModalVisible = false;
    this.router.navigate(['/tabs/tab-items']);
  }

  goToCheckoutClicked() {
    this.isOptionsModalVisible = false;
    this.router.navigate(['/tabs/tab-order']);
  }
}
