import { Pipe, PipeTransform } from '@angular/core';
import { SettingsService } from '../../../../admin/src/app/common-services-components/services/settings.service';

@Pipe({
  name: 'getSettingFromArray',
  pure: true
})
export class GetSettingFromArrayPipe implements PipeTransform {

  constructor(private settingsService: SettingsService) {

  }

  transform(value: any, args?: any): any {
    return this.settingsService.getSettingFromArray(value);
  }

}
