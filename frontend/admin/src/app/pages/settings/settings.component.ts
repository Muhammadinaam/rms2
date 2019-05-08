import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { GenericAddEdit } from '../classes/GenericAddEdit';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../services/base-end-point.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  submitting = false;
  settings;

  constructor(private settingsService: SettingsService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.settingsService.allSettings()
      .subscribe(settings => {
        this.settings = settings;

        var settingGroups = Object.keys(this.settings);
        settingGroups.forEach(settingGroup => {
          this.settings[settingGroup].forEach(setting => {
            if(setting['type'] == 'image' && setting['value'] != null && setting['value'] != ''){
              setting['imageURL'] = BaseEndPointService.getBaseEndPoint() + '/images/' + setting['value'];
            }
          });
        });
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
      }).add(() => {
        this.submitting = false;
      });
  }

  private alertValidationErrors(error: any) {
    let validationMessages = error.error.errors;
    let errorMessage = '';
    Object.keys(validationMessages).forEach(key => {
        validationMessages[key].forEach(msg => {
            errorMessage += '- ' + msg + '\n';
        });
    });
    alert(errorMessage);
}

  uploadImagesAndSubmitData(): any {

    this.submitting = true;

    var settingGroups = Object.keys(this.settings);

    var counter = 0;
    var filesCount = 0;
    
    settingGroups.forEach(settingGroup => {

      this.settings[settingGroup].forEach(setting => {
        
        if(setting['value'] instanceof File){
          filesCount++;
        }

      });

    });

    if(filesCount == 0)
    {
        this.saveSettings();
        return;
    }

    settingGroups.forEach(settingGroup => {

      this.settings[settingGroup].forEach(setting => {
        
        if(setting['value'] instanceof File)
        {
          var fd = new FormData();
          fd.append('image', setting['value']);
          fd.append('folder', "settings");
          this.httpClient.post(BaseEndPointService.getBaseEndPoint() + '/api/store-image', fd)
              .subscribe(resp => {
                  counter++;
                  setting['value'] = resp['file_with_path'];

                  console.log(counter + '--' + filesCount);
                  if(counter == filesCount)
                  {
                      this.saveSettings();
                  }
              }, error => {
                  if(error.status == 422)
                  {
                      this.alertValidationErrors(error);

                  }else
                  {
                      alert(error.message);
                  }
                  this.submitting = false;
              });
        }

      });

    });

}

showImage(event: Event, setting): void {
    const target= event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        setting['value'] = file;

        const reader = new FileReader();
        reader.onload = e => setting['imageURL'] = reader.result;

        reader.readAsDataURL(file);

    }
}

}
