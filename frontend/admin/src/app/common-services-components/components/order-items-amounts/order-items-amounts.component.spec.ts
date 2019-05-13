import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsAmountsComponent } from './order-items-amounts.component';

describe('OrderItemsAmountsComponent', () => {
  let component: OrderItemsAmountsComponent;
  let fixture: ComponentFixture<OrderItemsAmountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemsAmountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemsAmountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
