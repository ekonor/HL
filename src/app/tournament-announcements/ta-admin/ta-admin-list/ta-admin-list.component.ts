// import { Component, Injectable, OnInit } from '@angular/core';
import { Component, Injectable, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'app/components/alert/alert.service';

import { TournamentAnnouncementsService } from 'app/tournament-announcements/shared/tournament-announcements.service';
import { ListResponse } from 'app/shared/list/list-response';
import { TournamentAnnouncementListItem } from 'app/tournament-announcements/shared/tournament-announcement-list-item';
import {Organization} from 'app/organizations/shared/organization';
import { ArenaService} from 'app/arenas/shared/arena.service';
import { Arena} from 'app/arenas/shared/arena';

@Component({
  moduleId: module.id,
  selector: 'ta-admin-list',
  templateUrl: 'ta-admin-list.component.html',
  styleUrls: ['ta-admin-list.component.scss']
})

@Injectable()
export class TAAdminListComponent implements OnInit {
 @Input() content: TournamentAnnouncementListItem[];
 @Output() onChanged = new EventEmitter<number>();

  constructor( private service: TournamentAnnouncementsService,
               private arenaService: ArenaService,
               private router: Router,
               private alertService: AlertService ) {
  }

  ngOnInit() {
  }

  public viewTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementListItem): void {
    this.router.navigate([ 'tournament-announcement', tournamentAnnouncement.id ]);
  }

  public editTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementListItem): void {
    this.router.navigate([ 'tournament-announcement/edit', tournamentAnnouncement.id ]);
  }

  /*public addTournamentAnnouncement(): void {
    this.router.navigate([ 'tournament-announcements/create']);
  }*/

  public listTournaments(): void {
    this.router.navigate([ 'tournament-announcements']);
  }

  /*public draftToModerateTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementListItem) {
    tournamentAnnouncement.state = 'WaitModeration';
    this.service.updateTournamentAnnouncement(tournamentAnnouncement);
  }*/

  public sendOnModeration(tournamentAnnouncement: TournamentAnnouncementListItem) {
    if (confirm('Вы действительно хотите отправить анонс на модерацию?')) {
      const id = tournamentAnnouncement.id;
      this.service.sendOnModeration(tournamentAnnouncement.id).subscribe(
        data => {
          //this.router.navigate(['/tournament-announcements']);
        },
        error => {
          this.alertService.error(error);
          this.alertService.error("Не удалось отправить на модерацию анонс турнира");
          alert('Не удалось отправить анонс на модерацию');
        },
        () => {
          alert('Анонс успешно отправлен на модерацию, ожидайте решения модератора');
          this.onChanged.emit(id);
        });
    }
  }

  public deleteTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementListItem) {
    if (confirm('Вы действительно хотите удалить анонс?')) {
      const id = tournamentAnnouncement.id;
      this.service.deleteTournamentAnnouncement(tournamentAnnouncement.id).subscribe(
        data => {
          //this.router.navigate(['/tournament-announcements']);
        },
        error => {
          this.alertService.error(error);
          this.alertService.error('Не удалось удалить анонс турнира');
          alert('Не удалось удалить анонс турнира');
        },
        () => {
          alert('Анонс удален успешно');
          this.onChanged.emit(id);
        });
    }
  }

  public cancelTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementListItem) {
    if (confirm('Вы действительно хотите отменить турнир?')) {
      const id = tournamentAnnouncement.id;
      this.service.cancelTournamentAnnouncement(tournamentAnnouncement.id).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.alertService.error('Не удалось отменить турнир');
          alert('Не удалось отменить турнир');
        },
        () => {
          alert('Турнир успешно отменен');
          this.onChanged.emit(id);
        });
    }
  }

  public finishTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementListItem) {
    if (confirm('Вы действительно хотите завершить прием заявок?')) {
      const id = tournamentAnnouncement.id;
      this.service.finishTournamentAnnouncement(tournamentAnnouncement.id).subscribe(
        data => {
          //this.router.navigate(['/tournament-announcements']);
        },
        error => {
          this.alertService.error(error);
          this.alertService.error("Не удалось завершить прием заявок");
          alert('Не удалось завершить прием заявок');
        },
        () => {
          alert('Прием заявок успешно завершен');
          this.onChanged.emit(id);
        });
    }
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

  /*public getArenaLogo(arena: Arena): string {
    if (arena) {
      return this.arenaService.getArenaLogo(arena);
    }
    return '';
  }*/

  public getStateClass(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getStateClass(tournamentAnnouncement);
  }

  public getStateTitle(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getStateTitle(tournamentAnnouncement);
  }

  // TODO вынести отдельный сервис для организаций (когда буду делать страницу для организации)
  public getOrganizationLogo(/*organization: Organization*/ tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getTournamentAnnouncementLogo(tournamentAnnouncement);
  }

  public getFinishIconClass(): string {
    return this.service.getFinishIconClass();
  }

  public getCancelIconClass(): string {
    return this.service.getCancelIconClass();
  }

  public getSendOnModerationIconClass(): string {
    return this.service.getSendOnModerationIconClass();
  }

  public getDeleteIconClass(): string {
    return this.service.getDeleteIconClass();
  }

  public getEditIconClass(): string {
    return this.service.getEditIconClass();
  }

  public getModerationIconClass(flag: boolean): string {
    return this.service.getModerationIconClass(flag);
  }

  private moderate(tournamentAnnouncement: TournamentAnnouncementListItem, flag: boolean) {
    if (tournamentAnnouncement) {
      if (confirm( flag ? 'Вы действительно хотите одобрить анонс?' : 'Вы действительно хотите отклонить анонс?' )) {
        const id = tournamentAnnouncement.id;
        this.service.moderateTournamentAnnouncement(tournamentAnnouncement.id, flag).subscribe(
          data => {
          },
          error => {
            this.alertService.error(error);
            this.alertService.error( flag ? 'Не удалось одобрить анонс' : 'Не удалось отклонить анонс');
            alert(flag ? 'Не удалось одобрить анонс' : 'Не удалось отклонить анонс');
          },
          () => {
            alert(flag ? 'Анонс успешно одобрен' : 'Анонс успешно отклонен');
            this.onChanged.emit(id);
          });
      }
    }
  }
}
