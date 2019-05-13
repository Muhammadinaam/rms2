import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesItemsSearchComponent } from './categories-items-search.component';

describe('CategoriesItemsSearchComponent', () => {
  let component: CategoriesItemsSearchComponent;
  let fixture: ComponentFixture<CategoriesItemsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesItemsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesItemsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
