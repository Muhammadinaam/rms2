import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsService } from '../../../common-services-components/services/settings.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  isKeyboardEnabled = false;

  userMenu = [{ title: 'Change Password' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private analyticsService: AnalyticsService,
              private authService: AuthService,
              private settingsService: SettingsService) {
  }

  async ngOnInit() {
    this.user = await this.authService.getLoggedInUserFromBackend().toPromise();

    if(this.user == null) {
      this.authService.getLoggedInUserFromBackend()
        .subscribe(user => {
          this.authService.user = user;
          this.user = user;
        });
    }

  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  keyboardCheckboxChanged(isChecked: boolean) {
    this.settingsService.isKeyboardEnabled = isChecked;
  }
}
