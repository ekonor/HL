import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaListComponent } from './tournament-announcement-list.component';

describe('ArenasComponent', () => {
  let component: ArenaListComponent;
  let fixture: ComponentFixture<ArenaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArenaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
