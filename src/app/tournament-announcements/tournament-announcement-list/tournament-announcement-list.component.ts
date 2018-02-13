import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TournamentAnnouncementsService } from 'app/tournament-announcements/shared/tournament-announcements.service';
import { ListResponse } from 'app/shared/list/list-response';
import { TournamentAnnouncementListItem } from 'app/tournament-announcements/shared/tournament-announcement-list-item';

@Component({
  moduleId: module.id,
  selector: 'tournament-announcement-list',
  inputs: ['content'],
  templateUrl: 'tournament-announcement-list.component.html',
  styleUrls: ['tournament-announcement-list.component.scss']
})

@Injectable()
export class TournamentAnnouncementListComponent implements OnInit {
  content: TournamentAnnouncementListItem[];

  constructor( private service: TournamentAnnouncementsService,
               private router: Router) {
  }

  ngOnInit() {
  }

  public viewTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementListItem): void {
    this.router.navigate([ 'tournament-announcement', tournamentAnnouncement.id ]);
  }

  public editTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementListItem): void {
    this.router.navigate([ 'tournament-announcement/edit', tournamentAnnouncement.id ]);
  }

  public addTournamentAnnouncement(): void {
    this.router.navigate([ 'tournament-announcements/create']);
  }

  public geTournamentAnnouncementLogo(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getTournamentAnnouncementLogo(tournamentAnnouncement);
  }
}
