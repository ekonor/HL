import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentAnnouncementFilterComponent } from 'app/tournament-announcements/ta-filter/ta-filter/ta-filter.component';

describe('ArenasComponent', () => {
  let component: TournamentAnnouncementFilterComponent;
  let fixture: ComponentFixture<TournamentAnnouncementFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentAnnouncementFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentAnnouncementFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
