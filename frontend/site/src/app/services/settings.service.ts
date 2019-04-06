import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from './base-end-point.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  allSettingsArray;

  getDeliveryChargesFunction() {
    return this.getSettingFromArray('delivery-charges-function');
  }
  getSalesTaxPercent() {
    return this.getSettingFromArray('sales-tax-percent');
  }
  getWebDiscountPercent() {
    return this.getSettingFromArray('web-discount-percent');
  }

  getCurrencyCode() {
    return this.getSettingFromArray('currency-code');
  }

  constructor(
    private http: HttpClient) 
  {
    
  }

  getSettingFromArray(idt)
  {
    return this.allSettingsArray.find( s => s.idt == idt)['value'];
  }

  Init() {
 
    return new Promise<void>((resolve, reject) => {
        console.log("Init() called");
        ////do your initialisation stuff here  
        this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/get-all-settings')
          .subscribe(allSettings => {
            this.allSettingsArray = allSettings;
            resolve();
          }, 
          () => {
            alert('Error occurred in loading site settings, please retry');
            reject();
          })

    });
  }

  getSettingFromBackend(settingIdentifier)
  {
    return this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/get-setting-by-idt?idt=' + settingIdentifier);
  }

}
