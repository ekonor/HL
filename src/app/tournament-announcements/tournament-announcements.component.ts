import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListResponse } from 'app/shared/list/list-response';
import { ListInfo } from 'app/shared/list/list-info';
import { PaginationService } from 'app/shared/pagination.service';
import { SortOption } from 'app/shared/sorting/sort-option';

import { TournamentAnnouncementsService } from 'app/tournament-announcements/shared/tournament-announcements.service';
import { TournamentAnnouncementListItem } from 'app/tournament-announcements/shared/tournament-announcement-list-item';
import { TournamentAnnouncementFilter } from 'app/tournament-announcements/shared/tournament-announcement-filter';

@Component({
  moduleId: module.id,
  selector: 'tournament-announcements',
  templateUrl: 'tournament-announcements.component.html'
})

@Injectable()
export class TournamentAnnouncementsComponent implements OnInit {
  tournamentAnnouncementList: ListResponse<TournamentAnnouncementListItem>;
  errorMessage: string;

  filter: TournamentAnnouncementFilter = new TournamentAnnouncementFilter();
  listInfo: ListInfo = new ListInfo();
  sortOptions: SortOption[] = new Array<SortOption>();
  pageSize: number;
  dataIsLoading: boolean;

  private sub: any;

  constructor(
    private readonly tournamentService: TournamentAnnouncementsService,
    private readonly paginationService: PaginationService,
    private activatedRoute: ActivatedRoute) {
    this.pageSize = this.paginationService.pageSize;

    this.sortOptions = [
      { title: 'Название', value: 'Name' },
      { title: 'Дата создания анонса', value: 'CreateDate' }
    ];
  }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      this.listInfo.createFromParams(params, this.pageSize);
      this.getTournamentAnnouncements();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onFiltered($event) {
    console.log("filter");
    this.getTournamentAnnouncements();
  }

  public onSorted($event) {
    this.listInfo.orderBy = $event.orderBy;
    this.listInfo.orderDir = $event.orderDir;

    this.getTournamentAnnouncements();
  }

  private getTournamentAnnouncements() {
    this.dataIsLoading = true;
    this.tournamentService.getTournamentAnnouncements(this.filter, this.listInfo)
      .subscribe(
        tournamentAnnouncements => {
          this.tournamentAnnouncementList = tournamentAnnouncements;
        },
        error => {
          this.errorMessage = error;
          console.log(this.errorMessage);
         },
        () => this.dataIsLoading = false
      );
  }
}
