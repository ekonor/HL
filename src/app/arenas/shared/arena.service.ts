import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ArenaListItem } from 'app/arenas/shared/arena-list-item';
import { ListResponse } from 'app/shared/list/list-response';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { ArenaFilter } from 'app/arenas/shared/arena-filter';
import { Arena } from './arena';
import { ArenaType } from "./arena-type";
import { ListInfo } from 'app/shared/list/list-info';


@Injectable()
export class ArenaService{
  constructor(private httpClient: HttpClient) {
  }

  public getArenas(filter: ArenaFilter, listInfo: ListInfo): Observable<ListResponse<ArenaListItem>> {
    const methodUrlPrefix = "/list";
    
    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = new HttpParams();

    if(filter.arenaTypeId)
      params = params.append('arenaTypeId', filter.arenaTypeId.toString());
    if(listInfo.skip != null)
      params = params.append('skip', listInfo.skip.toString());
    if(listInfo.take != null)
      params = params.append('take', listInfo.take.toString());

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

  public updateArena( arena: Arena ) {
    return this.http.put(this.url + "/" + arena.id, arena)
      .toPromise()
      .catch(this.handleError);
  }

  public deleteArena( arena: Arena ) {
    return this.http.delete(this.url + "/" + arena.id)
      .toPromise()
      .catch(this.handleError);
  }
  */

  private getMethodUrl(methodUrlPrefix: string) : string {
    let baseServiceApiUrl = `/api/v1/arenas`;
    return baseServiceApiUrl + methodUrlPrefix;
  }
}
