import { Component } from '@angular/core';
import { SettingsService } from '../../../admin/src/app/common-services-components/services/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Restaurant';

  constructor(public settingsService: SettingsService, private router: Router)
  {
    
  }

  refresh(){
    //window.location.reload();
    this.settingsService.Init()
      .then(() => {
        this.router.navigate(['/']);
      })
  }

}
