import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAndTaxReportComponent } from './sales-and-tax-report.component';

describe('SalesAndTaxReportComponent', () => {
  let component: SalesAndTaxReportComponent;
  let fixture: ComponentFixture<SalesAndTaxReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesAndTaxReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAndTaxReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
