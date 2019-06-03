import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromToFilterComponent } from './from-to-filter.component';

describe('FromToFilterComponent', () => {
  let component: FromToFilterComponent;
  let fixture: ComponentFixture<FromToFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromToFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromToFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
