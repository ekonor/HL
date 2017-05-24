import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HockeyNewsComponent } from './hockey-news.component';

describe('HockeyNewsComponent', () => {
  let component: HockeyNewsComponent;
  let fixture: ComponentFixture<HockeyNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HockeyNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HockeyNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
