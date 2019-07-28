import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isOrderPendingOrPreparing',
  pure: true
})
export class IsOrderPendingOrPreparingPipe implements PipeTransform {

  transform(order: any, args?: any): any {
    return order.order_status_idt == 'phone-confirmation-pending' || 
    order.order_status_idt == 'preparing' || order.order_status_idt == 'phone-not-confirmed';
  }

}
