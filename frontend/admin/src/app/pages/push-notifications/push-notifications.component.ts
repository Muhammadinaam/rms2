import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.scss']
})
export class PushNotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openPushNotifications() {
    window.open("https://app.onesignal.com", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=5000,height=5000");
  }

}
