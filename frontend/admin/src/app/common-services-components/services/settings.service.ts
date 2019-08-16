import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../common-services-components/services/base-end-point.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  orderTypes;
  public initialized = false;
  isKeyboardEnabled: boolean;
  initError: any = null;
  
  constructor(private http: HttpClient) 
  {
    
  }

  allSettings()
  {
    return this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/get-all-settings?grouped=1');
  }

  saveSettings(settings: any): any {
    
    return this.http.post(BaseEndPointService.getBaseEndPoint() + '/api/save-settings', settings);

  }

  allSettingsArray;

  getDeliveryChargesFunction() {
    return this.getSettingFromArray('delivery-charges-function');
  }
  getSalesTaxPercent() {
    return +this.getSettingFromArray('sales-tax-percent');
  }

  getWebsiteDiscountPercent() {
    return this.getSettingFromArray('website-discount-percent');
  }

  getAppDiscountPercent() {
    return this.getSettingFromArray('app-discount-percent');
  }

  getGeneralDiscountPercent() {
    return this.getSettingFromArray('general-discount-percent');
  }

  getCurrencyCode() {
    return this.getSettingFromArray('currency-code');
  }

  getSettingFromArray(idt)
  {
    let setting = this.allSettingsArray.find( s => s.idt == idt)

    if(setting == null) {
      alert('Error occurred in getting setting ['+idt+']');
      return null;
    }

    return setting['value'];
  }

  Init() {
 
    return new Promise((resolve, reject) => {
        console.log("Init() called");
        ////do your initialisation stuff here  
        this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/get-all-settings')
          .subscribe(allSettings => {
            this.allSettingsArray = allSettings;

            this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/table?table=order_types')
            .subscribe(data => {
              this.orderTypes = data;

              this.initialized = true;
              resolve(true);
            });

          }, 
          (error) => {
            //alert('Error occurred in loading site settings, please retry');

            this.initialized = false;
            resolve(error);
            this.initError = error;
            //reject();
          });

          
    });
  }

  getSettingFromBackend(settingIdentifier)
  {
    return this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/get-setting-by-idt?idt=' + settingIdentifier);
  }
}
