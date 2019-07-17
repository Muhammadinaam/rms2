import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Pipe({
  name: 'hasPermission',
  pure: true,
})
export class HasPermissionPipe implements PipeTransform {

  constructor(private authService: AuthService) {

  }

  transform(value: any, args?: any) {
    let result = this.hasPermission(value);
    return result;
  }

  hasPermission(permission) {
    let result = this.authService.loggedInUserHasPermission(permission);
    return result;
  }

}
