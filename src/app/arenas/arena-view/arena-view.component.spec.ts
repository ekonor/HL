import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaViewComponent } from './arena-view.component';

describe('ArenasComponent', () => {
  let component: ArenaViewComponent;
  let fixture: ComponentFixture<ArenaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArenaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
