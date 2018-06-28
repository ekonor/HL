import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TournamentAnnouncementsService } from 'app/tournament-announcements/shared/tournament-announcements.service';
import { ListResponse } from 'app/shared/list/list-response';
import { TournamentAnnouncementListItem } from 'app/tournament-announcements/shared/tournament-announcement-list-item';
import {Organization} from 'app/organizations/shared/organization';
import { ArenaService} from 'app/arenas/shared/arena.service';
import { Arena} from 'app/arenas/shared/arena';

@Component({
  moduleId: module.id,
  selector: 'tournament-announcement-list',
  inputs: ['content'],
  templateUrl: 'tournament-announcement-list.component.html'
})

@Injectable()
export class TournamentAnnouncementListComponent implements OnInit {
  content: TournamentAnnouncementListItem[];

  constructor( private service: TournamentAnnouncementsService,
               private arenaService: ArenaService,
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

  public getTournamentAnnouncementLogo(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getTournamentAnnouncementLogo(tournamentAnnouncement);
  }

  public getRequiredResponseCount(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getRequiredResponseCountText(tournamentAnnouncement);
  }

  public getAgeGroupIconClass(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getAgeGroupIconClass(tournamentAnnouncement);
  }

  public getGenderIconClass(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getGenderIconClass(tournamentAnnouncement);
  }

  public getCostText(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getCostText(tournamentAnnouncement);
  }

  public getNoData(): string {
    return this.service.getNoData();
  }

  /* public getArenaLogo(arena: Arena): string {
    return this.arenaService.getArenaLogo(arena);
  }*/

  // TODO вынести отдельный сервис для организаций (когда буду делать страницу для организации)
  public getOrganizationLogo(/*organization: Organization*/ tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getTournamentAnnouncementLogo(tournamentAnnouncement);
  }

  public getAgeGroupDescription(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    if (tournamentAnnouncement) {
      return this.service.getAgeGroupDescription(tournamentAnnouncement);
    }
    return this.getNoData();
  }

  public getGenderDescription(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    if (tournamentAnnouncement) {
      return this.service.getGenderDescription(tournamentAnnouncement);
    }
    return this.getNoData();
  }
}
