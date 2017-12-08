import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

import { ArenaListItem } from 'app/arenas/shared/arena-list-item';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { ArenaEditItem } from 'app/arenas/shared/arena-edit-item';
import { ArenaFilter } from 'app/arenas/shared/arena-filter';
import { AuthenticationService } from 'app/auth/authentication.service';
import { ArenaType } from './arena-type';
import { ListResponse } from 'app/shared/list/list-response';
import { ListInfo } from 'app/shared/list/list-info';
import {baseServeCommandOptions} from "@angular/cli/commands/serve";


@Injectable()
export class ArenaService {
  private apiUrl = "http://hockey.smargit.com/HockeyApp.WebApi/api/v1/";
  constructor(private readonly httpClient: HttpClient, private readonly authService: AuthenticationService) {
    }

  public getArenas(filter: ArenaFilter, listInfo: ListInfo): Observable<ListResponse<ArenaListItem>> {
    const methodUrlPrefix = "/list";

    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = listInfo.toParams();

    if(filter.arenaTypeId)
      params = params.append('arenaTypeId', filter.arenaTypeId.toString());
    if(filter.cityId)
      params = params.append('cityId', filter.cityId.toString());
    if(filter.searchText)
      params = params.append('searchText', filter.searchText);

    return this.httpClient.get<ListResponse<ArenaListItem>>(methodUrl, {params: params});
  }

  public getArena(id: number): Observable<ArenaViewItem> {
    const methodUrlPrefix = "/" + id;
    let methodUrl = this.getMethodUrl(methodUrlPrefix);

    return this.httpClient.get<ArenaViewItem>(methodUrl);
  }

  public getArenaTypes(): Observable<ArenaType[]> {
    const methodUrlPrefix = "/types";
    let methodUrl = this.getMethodUrl(methodUrlPrefix);

    return this.httpClient.get<ArenaType[]>(methodUrl);
  }

  public getArenaLogo(arena: ArenaListItem | ArenaViewItem): string {
    let logoSrc = "http://hockey.smargit.com/HockeyApp.WebApi";
    let placeholder = "http://via.placeholder.com/250x150";
    return arena.logo ? logoSrc + arena.logo : placeholder;
  }

 /* public addArena( arena: Arena ) {
    return this.http.post(this.url, arena)
      .toPromise()
      .catch(this.handleError);
  }



  public deleteArena( arena: Arena ) {
    return this.http.delete(this.url + "/" + arena.id)
      .toPromise()
      .catch(this.handleError);
  }
  */

  public updateArena( id: number, arena: ArenaEditItem ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.authService.token
    });
    return this.httpClient.put(this.apiUrl + '/arenas/' + id, arena, {headers: headers});
  }

  private getMethodUrl(methodUrlPrefix: string) : string {
    //let baseServiceApiUrl = `/api/v1/arenas`;
    let baseServiceApiUrl = this.apiUrl + '/arenas';
    return baseServiceApiUrl + methodUrlPrefix;
  }
}
