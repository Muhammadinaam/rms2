import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAreacodesComponent } from './top-areacodes.component';

describe('TopAreacodesComponent', () => {
  let component: TopAreacodesComponent;
  let fixture: ComponentFixture<TopAreacodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAreacodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAreacodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
