import { IsOrderPendingOrPreparingPipe } from './is-order-pending-or-preparing.pipe';

describe('IsOrderPendingOrPreparingPipe', () => {
  it('create an instance', () => {
    const pipe = new IsOrderPendingOrPreparingPipe();
    expect(pipe).toBeTruthy();
  });
});
