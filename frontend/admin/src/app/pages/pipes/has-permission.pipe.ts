import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Pipe({
  name: 'hasPermission',
  pure: true,
})
export class HasPermissionPipe implements PipeTransform {

  constructor(private authService: AuthService) {

  }

  async transform(value: any, args?: any) {
    let result = await this.hasPermission(value);
    return result;
  }

  async hasPermission(permission) {
    let result = await this.authService.loggedInUserHasPermission(permission);
    return result;
  }

}
