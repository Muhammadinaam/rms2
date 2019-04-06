import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.settingsService.allSettings()
      .subscribe(settings => {
        this.settings = settings;
      })
  }

  saveSettings()
  {
    this.settingsService.saveSettings(this.settings)
      .subscribe(resp => {
        if(resp['success'] == true)
        {
          alert('Saved Successfully');
        }
        else
        {
          alert(resp['message']);
        }
      })
  }

}
