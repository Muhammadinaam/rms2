import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenOrdersAndTablesComponent } from './open-orders-and-tables.component';

describe('OpenOrdersAndTablesComponent', () => {
  let component: OpenOrdersAndTablesComponent;
  let fixture: ComponentFixture<OpenOrdersAndTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenOrdersAndTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenOrdersAndTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
