import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsAddEditComponent } from './items-add-edit.component';

describe('ItemsAddEditComponent', () => {
  let component: ItemsAddEditComponent;
  let fixture: ComponentFixture<ItemsAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
