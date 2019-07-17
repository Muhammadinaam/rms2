import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'orderPendingTime',
  pure: true,
})
export class OrderPendingTimePipe implements PipeTransform {

  transform(order: any, args?: any): any {
    
    let created_at = moment(order.created_at);
    let current = moment();
    let diff = current.diff(created_at, 'minutes');

    return diff;

  }

}
