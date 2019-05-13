import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesAddEditComponent } from './tables-add-edit.component';

describe('TablesAddEditComponent', () => {
  let component: TablesAddEditComponent;
  let fixture: ComponentFixture<TablesAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
