import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { SettingsService } from '../../common-services-components/services/settings.service';

@Component({
  selector: 'push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.scss']
})
export class PushNotificationsComponent implements OnInit {

  private http: HttpClient;

  data = {
    title: '',
    message: '',
  };

  constructor(handler: HttpBackend, private settings: SettingsService) { 
    this.http = new HttpClient(handler);
  }

  ngOnInit() {
  }

  submit() {

    let appId = this.settings.getSettingFromArray('app-id');
    let apiKey = this.settings.getSettingFromArray('api-key');

    let body = {
      "app_id": appId,
      "included_segments": ["All"],
      "headings": {"en": this.data.title},
      "contents": {"en": this.data.message}
    };

    this.http.post("https://onesignal.com/api/v1/notifications", body, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic " + apiKey,
      }
    }).subscribe(resp => {
      alert('Sent Successfully');
      this.data.title = '';
      this.data.message = '';
    }, error => {
      alert('Error occurred');
    });
  }
}
