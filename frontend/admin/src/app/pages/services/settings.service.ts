import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../services/base-end-point.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  allSettings()
  {
    return this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/get-all-settings?grouped=1');
  }

  saveSettings(settings: any): any {
    
    return this.http.post(BaseEndPointService.getBaseEndPoint() + '/api/save-settings', settings);

  }
}
