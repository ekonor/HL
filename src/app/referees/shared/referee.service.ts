import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RefereeFastCreation } from 'app/referees/shared/referee-fast-creation';
import { RefereeListItem } from 'app/referees/shared/referee-list-item';
import { RefereeFilter } from 'app/referees/shared/referee-filter';
import { AuthenticationService } from 'app/core/auth/authentication.service';
import { ListResponse } from 'app/shared/list/list-response';
import { ListInfo } from 'app/shared/list/list-info';
import { ApiConfig } from 'app/core/api-config';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class RefereeService {
  constructor(
    private httpClient: HttpClient,
    private readonly authService: AuthenticationService,
    private readonly apiConfig: ApiConfig) {
  }

  public addRefereeFast(referee: RefereeFastCreation): Observable<number> {
    // TODO свернуть
    const body = JSON.stringify({
      'name': referee.name,
      'cityId': referee.city.id
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.post<number>(this.getMethodUrl('/referees/'), body, { headers: headers });
    }
  }

  public getReferees(filter: RefereeFilter, listInfo: ListInfo): Observable<ListResponse<RefereeListItem>> {
    const methodUrlPrefix = '/referees' + '/list';
// TODO исправить листинфо, сейчас не работает
    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = new HttpParams();
    if (filter) {
      if (filter.refereeTypeId)
        params = params.append('refereeTypeId', filter.refereeTypeId.toString());
      if (filter.cityId)
        params = params.append('cityId', filter.cityId.toString());
      if (filter.searchText)
        params = params.append('searchText', filter.searchText);
    }
    return this.httpClient.get<ListResponse<RefereeListItem>>(methodUrl, { params: params });
  }

  public getInfoIconClass(): string {
    return 'fa fa-question info-icon';
  }

  public getAddIconClass(): string {
    return 'fa fa-plus';
  }

  public getDeleteIconClass(): string {
    return 'fa fa-close';
  }

  public getMoveUpIconClass(): string {
    return 'fa fa-arrow-up';
  }

  public getMoveDownIconClass(): string {
    return 'fa fa-arrow-down';
  }

  private getMethodUrl(methodUrlPrefix: string): string {
    return this.apiConfig.apiPath + methodUrlPrefix;
  }
}
