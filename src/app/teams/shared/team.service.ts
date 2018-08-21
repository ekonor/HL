import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';


import { Team } from 'app/teams/shared/team';
import { TeamFilter } from 'app/teams/shared/team-filter';
import { AuthenticationService } from 'app/core/auth/authentication.service';
import { City } from 'app/core/geo/city';
import { ListResponse } from 'app/shared/list/list-response';
import { ListInfo, SortDir} from 'app/shared/list/list-info';
import { ApiConfig } from 'app/core/api-config';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class TeamService {
  constructor(
    private httpClient: HttpClient,
    private readonly authService: AuthenticationService,
    private readonly apiConfig: ApiConfig) {
  }

  public getTeams(filter: TeamFilter, listInfo: ListInfo): Observable<ListResponse<Team>> {
    console.log("get teams");
    const methodUrlPrefix = '/teams' + '/list';
// TODO исправить листинфо, сейчас не работает
    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = new HttpParams();
    if (filter) {
      /*if (filter.teamTypeId)
        params = params.append('teamTypeId', filter.arenaTypeId.toString());*/
      if (filter.cityId)
        params = params.append('cityId', filter.cityId.toString());
      if (filter.searchText)
        params = params.append('searchText', filter.searchText);
    }
    return this.httpClient.get<ListResponse<Team>>(methodUrl, { params: params });
  }


  public addTeamFast(team: Team): Observable<number> {
    // TODO свернуть
    const body = JSON.stringify({
      'name': team.name,
      'cityId': team.city.id
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.post<number>(this.getMethodUrl('/teams/'), body, { headers: headers });
    }
  }

  public getTeamLogo(team: Team ): string {
    let logoSrc = this.apiConfig.filesPath;
    let placeholder = "assets/img/teams/no_logo.png";
    return team.logo ? logoSrc + team.logo : placeholder;
  }

  public getAddIconClass(): string {
    return 'fa fa-plus';
  }

  public getEditIconClass(): string {
    return 'fa fa-pencil';
  }

  private getMethodUrl(methodUrlPrefix: string): string {
    return this.apiConfig.apiPath + methodUrlPrefix;
  }
}
