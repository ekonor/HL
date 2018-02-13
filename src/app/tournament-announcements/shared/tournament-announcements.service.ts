import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import { TournamentAnnouncementListItem } from 'app/tournament-announcements/shared/tournament-announcement-list-item';
import { TournamentAnnouncementFilter } from 'app/tournament-announcements/shared/tournament-announcement-filter';
import { AuthenticationService } from 'app/core/auth/authentication.service';
import { ListResponse } from 'app/shared/list/list-response';
import { ListInfo } from 'app/shared/list/list-info';
import { ApiConfig } from 'app/core/api-config';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class TournamentAnnouncementsService {
  constructor(
    private httpClient: HttpClient,
    private readonly authService: AuthenticationService,
    private readonly apiConfig: ApiConfig) {
  }

  public getTournamentAnnouncements(filter: TournamentAnnouncementFilter, listInfo: ListInfo): Observable<ListResponse<TournamentAnnouncementListItem>> {
    const methodUrlPrefix = '/tournament-announcements' + '/list';

    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = listInfo.toParams();

    if (filter.cityId)
      params = params.append('cityId', filter.cityId.toString());
    if (filter.startDateFrom)
      params = params.append('startDateFrom', filter.startDateFrom);
    if (filter.startDateTo)
      params = params.append('startDateTo', filter.startDateTo);
    if (filter.state)
      params = params.append('state', filter.state);
    if (filter.ageGroup)
      params = params.append('ageGroup', filter.ageGroup);
    if (filter.gender)
      params = params.append('gender', filter.gender);
    if (filter.isCommercial)
      params = params.append('isCommercial', filter.isCommercial.toString());
    if (filter.searchText)
      params = params.append('searchText', filter.searchText);

    return this.httpClient.get<ListResponse<TournamentAnnouncementListItem>>(methodUrl, { params: params });
  }

  public getTournamentAnnouncementLogo(tournamentAnnouncement: TournamentAnnouncementListItem /*| TournamentAnnouncementViewItem*/): string {
    let logoSrc = this.apiConfig.filesPath;
    let placeholder = "assets/img/arenas/no_logo.png"; // TODO
    return tournamentAnnouncement.logo ? logoSrc + tournamentAnnouncement.logo : placeholder;
  }

  private getMethodUrl(methodUrlPrefix: string): string {
    return this.apiConfig.apiPath + methodUrlPrefix;
  }
}
