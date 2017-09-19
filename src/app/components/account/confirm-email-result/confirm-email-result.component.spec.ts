import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailResultComponent } from './confirm-email-result.component';

describe('ConfirmEmailResultComponent', () => {
  let component: ConfirmEmailResultComponent;
  let fixture: ComponentFixture<ConfirmEmailResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmEmailResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEmailResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
