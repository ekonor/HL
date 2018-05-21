import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params } from '@angular/router';
import { AgmMap, AgmMarker } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'app/components/alert/alert.service';

import { TournamentAnnouncementsService } from 'app/tournament-announcements/shared/tournament-announcements.service';
import { TournamentAnnouncementViewItem } from 'app/tournament-announcements/shared/tournament-announcement-view-item';
import { ArenaService} from 'app/arenas/shared/arena.service';
import { Arena} from 'app/arenas/shared/arena';
import { Point } from 'app/shared/map/point';
import { debounce } from 'rxjs/operator/debounce';
import {Organization} from 'app/tournament-announcements/shared/organization';

@Component({
  moduleId: module.id,
  selector: "tournament-announcement-view",
  templateUrl: "tournament-announcement-view.component.html",
  styleUrls: ["tournament-announcement-view.component.scss"]
})
export class TournamentAnnouncementViewComponent {
  tournamentAnnouncement: TournamentAnnouncementViewItem;
  id: number;
  mapPoint: Point;
  zoom: number;

  dataIsLoading: boolean;

  errorMessage: string;
  private sub: any;

  //returnUrl: string;

  constructor( private service: TournamentAnnouncementsService,
               private arenaService: ArenaService,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService,
               private router: Router) {
    //this.tournamentAnnouncement = new TournamentAnnouncementViewItem();
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getTournamentAnnouncement(this.id);
    });

    //this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  public getTournamentAnnouncementLogo(tournamentAnnouncement: TournamentAnnouncementViewItem): string {
    return this.service.getTournamentAnnouncementLogo(tournamentAnnouncement);
  }

  public getRequiredResponseCount(tournamentAnnouncement: TournamentAnnouncementViewItem): string {
    if (tournamentAnnouncement) {
      return this.service.getRequiredResponseCountText(tournamentAnnouncement);
    }
    return this.getNoData();
  }

  public getAgeGroupIconClass(tournamentAnnouncement: TournamentAnnouncementViewItem): string {
    if (tournamentAnnouncement) {
      return this.service.getAgeGroupIconClass(tournamentAnnouncement);
    }
    return this.getNoData();
  }

  public getGenderIconClass(tournamentAnnouncement: TournamentAnnouncementViewItem): string {
    if (tournamentAnnouncement) {
      return this.service.getGenderIconClass(tournamentAnnouncement);
    }
    return this.getNoData();
  }

  public getCostText(tournamentAnnouncement: TournamentAnnouncementViewItem): string {
    if (tournamentAnnouncement) {
      return this.service.getCostText(tournamentAnnouncement);
    }
    return this.getNoData();
  }

  public getNoData(): string {
    return this.service.getNoData();
  }

  public getArenaLogo(arena: Arena): string {
    if (arena) {
      return this.arenaService.getArenaLogo(arena);
    }
    return '';
  }

  // TODO вынести отдельный сервис для организаций (когда буду делать страницу для организации)
  public getOrganizationLogo(organization: Organization): string {
    if (organization && this.tournamentAnnouncement) { // TODO NEED FIX
      return this.service.getTournamentAnnouncementLogo(this.tournamentAnnouncement);
    }
    return '';
  }

  public editTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementViewItem): void {
    this.router.navigate([ 'tournament-announcement/edit', tournamentAnnouncement.id ]);
  }

  public getFinishIconClass(): string {
    return this.service.getFinishIconClass();
  }

  public getCancelIconClass(): string {
    return this.service.getCancelIconClass();
  }

  private getMapPoint(tournamentAnnouncement: TournamentAnnouncementViewItem): Point {
    if (this.tournamentAnnouncement && this.tournamentAnnouncement.coordinates && this.tournamentAnnouncement.coordinates.latitude && this.tournamentAnnouncement.coordinates.longitude){
      return { latitude: this.tournamentAnnouncement.coordinates.latitude, longitude: this.tournamentAnnouncement.coordinates.longitude };
    }
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

  public sendOnModeration(tournamentAnnouncement: TournamentAnnouncementViewItem) {
    if (confirm('Вы действительно хотите отправить анонс на модерацию?')) {
      this.service.sendOnModeration(tournamentAnnouncement.id).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.alertService.error("Не удалось отправить на модерацию анонс турнира");
          alert('Не удалось отправить анонс на модерацию');
        },
        () => {
          alert('Анонс успешно отправлен на модерацию, ожидайте решения модератора');
        });
    }
  }

  public deleteTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementViewItem) {
    if (confirm('Вы действительно хотите удалить анонс?')) {
      this.service.deleteTournamentAnnouncement(tournamentAnnouncement.id).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.alertService.error("Не удалось удалить анонс турнира");
        },
        () => {
          alert('Анонс успешно удален. Вы будете перенаправлены на страницу профиля.');
          this.router.navigate(['/profile']);
        }
      );
    }
  }

  public finishTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementViewItem) {
    if (confirm('Вы действительно хотите завершить прием заявок?')) {
      this.service.finishTournamentAnnouncement(tournamentAnnouncement.id).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.alertService.error('Не удалось завершить прием заявок');
          alert('Не удалось завершить прием заявок');
        },
        () => {
          alert('Прием заявок успешно завершен');
        });
    }
  }

  public cancelTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementViewItem) {
    if (confirm('Вы действительно хотите отменить турнир?')) {
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
        });
    }
  }

  private getTournamentAnnouncement(id: number) {
    this.dataIsLoading = true;
    this.service.getTournamentAnnouncement(id)
    .subscribe(
      tournamentAnnouncement => {
        this.tournamentAnnouncement = tournamentAnnouncement;
        this.mapPoint = this.getMapPoint(tournamentAnnouncement);
        this.zoom = 8;
      },
      error => {
        this.errorMessage = error;
        alert('Не удалось загрузить анонс. Вы будете перенаправлены на страницу профиля.');
        this.router.navigate(['/profile']);
      },
      () => this.dataIsLoading = false
    );
  }
}
