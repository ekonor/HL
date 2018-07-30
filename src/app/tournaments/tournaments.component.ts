import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ListResponse } from 'app/shared/list/list-response';
import { ListInfo } from 'app/shared/list/list-info';
import { PaginationService } from 'app/shared/pagination.service';
import { SortOption } from 'app/shared/sorting/sort-option';

import { TournamentService } from 'app/tournaments/shared/tournament.service';
import { TournamentListItem } from 'app/tournaments/shared/tournament-list-item';
import { TournamentFilter } from 'app/tournaments/shared/tournament-filter';

@Component({
  moduleId: module.id,
  selector: 'tournament-announcements',
  templateUrl: 'tournaments.component.html'
})

@Injectable()
export class TournamentsComponent implements OnInit {
  tournamentList: ListResponse<TournamentListItem>;
  errorMessage: string;
  filter: TournamentFilter = new TournamentFilter();
  listInfo: ListInfo = new ListInfo();
  sortOptions: SortOption[] = new Array<SortOption>();
  pageSize: number;
  dataIsLoading: boolean;

  toggledPartInfo: boolean;
  toggledAddInfo: boolean;

  private sub: any;

  constructor(
    private readonly tournamentService: TournamentService,
    private readonly paginationService: PaginationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.pageSize = this.paginationService.pageSize;

    this.sortOptions = [
      { title: 'Дата начала турнира', value: 'StartDate' },
      { title: 'Название', value: 'Name' }
    ];
    //this.filter.state.isRegistration = true;

    this.toggledAddInfo = true;
    this.toggledPartInfo = true;
  }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      this.listInfo.createFromParams(params, this.pageSize);
      this.getTournaments();
    });
    //this.getTournaments();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /*public onFiltered(filter: TournamentAnnouncementFilter) {
    if (filter) {
      this.filter = filter;
    }
    this.getTournamentAnnouncements();
  }*/

  public onSorted($event) {
    this.listInfo.orderBy = $event.orderBy;
    this.listInfo.orderDir = $event.orderDir;
    this.getTournaments();
  }

  public addTournamentAnnouncement(): void {
    this.router.navigate([ 'tournaments/create']);
  }

  getAddIconClass() {
    return this.tournamentService.getAddIconClass();
  }

  togglePartInfo() {
    this.toggledPartInfo = !this.toggledPartInfo;
  }

  toggleAddInfo() {
    this.toggledAddInfo = !this.toggledAddInfo;
  }

  getToggleInfoIcon(): string {
    return this.tournamentService.getInfoIconClass();
  }

  private getTournaments() {
    this.dataIsLoading = true;
    /*this.tournamentService.getTournaments(this.filter, this.listInfo)
      .subscribe(
        tournaments => {
          this.tournamentList = tournaments;
        },
        error => {
          this.errorMessage = error;
         },
        () => this.dataIsLoading = false
      );*/
    this.tournamentList = new ListResponse<TournamentListItem>();
    this.tournamentList.listItems = new Array<TournamentListItem>();
    this.tournamentList.listItems.push(new TournamentListItem());
    this.tournamentList.count = 1;
    this.dataIsLoading = false;
  }

  public addTournament(): void {
    this.router.navigate([ 'tournaments/create']);
  }

}
