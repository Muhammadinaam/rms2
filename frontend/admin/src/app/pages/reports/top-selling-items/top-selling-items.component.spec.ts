import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSellingItemsComponent } from './top-selling-items.component';

describe('TopSellingItemsComponent', () => {
  let component: TopSellingItemsComponent;
  let fixture: ComponentFixture<TopSellingItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSellingItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSellingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
