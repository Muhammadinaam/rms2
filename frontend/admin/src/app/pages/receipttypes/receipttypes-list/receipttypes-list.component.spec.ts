import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipttypesListComponent } from './receipttypes-list.component';

describe('ReceipttypesListComponent', () => {
  let component: ReceipttypesListComponent;
  let fixture: ComponentFixture<ReceipttypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceipttypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceipttypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
