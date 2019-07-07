import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipttypesAddEditComponent } from './receipttypes-add-edit.component';

describe('ReceipttypesAddEditComponent', () => {
  let component: ReceipttypesAddEditComponent;
  let fixture: ComponentFixture<ReceipttypesAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceipttypesAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceipttypesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
