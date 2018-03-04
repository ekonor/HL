import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentAnnouncementViewComponent } from './tournament-announcement-view.component';

describe('TournamentAnnouncementsComponent', () => {
  let component: TournamentAnnouncementViewComponent;
  let fixture: ComponentFixture<TournamentAnnouncementViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentAnnouncementViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentAnnouncementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
