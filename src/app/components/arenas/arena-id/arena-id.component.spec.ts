import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaIdComponent } from './arena-id.component';

describe('ArenaIdComponent', () => {
  let component: ArenaIdComponent;
  let fixture: ComponentFixture<ArenaIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArenaIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
