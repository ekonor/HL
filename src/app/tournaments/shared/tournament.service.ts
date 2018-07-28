import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TournamentListItem } from 'app/tournaments/shared/tournament-list-item';
import { TournamentFilter } from 'app/tournaments/shared/tournament-filter';
/*import { TournamentAnnouncementViewItem } from 'app/tournament-announcements/shared/tournament-announcement-view-item';
import { TournamentAnnouncement } from 'app/tournament-announcements/shared/tournament-announcement'; */
import { AuthenticationService } from 'app/core/auth/authentication.service';
import { ListResponse } from 'app/shared/list/list-response';
import { ListInfo } from 'app/shared/list/list-info';
import { ApiConfig } from 'app/core/api-config';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class TournamentService {
  constructor(
    private httpClient: HttpClient,
    private readonly authService: AuthenticationService,
    private readonly apiConfig: ApiConfig) {
  }

  public getTournaments(filter: TournamentFilter, listInfo: ListInfo): Observable<ListResponse<TournamentListItem>> {
    /*const methodUrlPrefix = '/tournaments' + '/list';
    const methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = listInfo.toParams();

    if (filter) {
      if (filter.cityId)
        params = params.append('cityId', filter.cityId.toString());
      if (filter.startDateFrom)
        params = params.append('startDateFrom', filter.startDateFrom);
      if (filter.startDateTo)
        params = params.append('startDateTo', filter.startDateTo);
      if (filter.state) {
        let arr = [];
        if (filter.state.isFinished === true) {
          arr.push('Finished');
        }
        if (filter.state.isRegistration === true) {
          arr.push('ApprovedByModerator');
        }
        if (arr.length > 0) {
          Object.keys(arr).forEach(function (key) {
            params = params.append('states', arr[key]);
          });
        }
      }
      if (filter.ageGroup) {
        let arr = [];

        if (filter.ageGroup.isAdults === true) {
          arr.push('Adults');
        }
        if (filter.ageGroup.isYouth === true) {
          arr.push('Youth');
        }
        if (filter.ageGroup.isJuniors === true) {
          arr.push('Juniors');
        }
        if (filter.ageGroup.isKids === true) {
          arr.push('Kids');
        }
        if (arr.length > 0) {
          Object.keys(arr).forEach(function (key) {
            params = params.append('ageGroups', arr[key]);
          });
        }
      }

      if (filter.gender)
        params = params.append('gender', filter.gender);
      if (filter.isCommercial)
        params = params.append('isCommercial', filter.isCommercial.toString());
      if (filter.searchText)
        params = params.append('searchText', filter.searchText);
    }
    return this.httpClient.get<ListResponse<TournamentAnnouncementListItem>>(methodUrl, { params: params });*/
    let list = new Observable<ListResponse<TournamentListItem>>();
    return list;
  }

  public getInfoIconClass(): string {
    return 'fa fa-question info-icon';
  }

  public getAddIconClass(): string {
    return 'fa fa-plus';
  }

}
