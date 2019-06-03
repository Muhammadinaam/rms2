import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../../admin/src/app/common-services-components/services/settings.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public settingsService: SettingsService) { }

  ngOnInit() {
  }

}
