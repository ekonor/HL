import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

import { ArenaListItem } from 'app/arenas/shared/arena-list-item';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { ArenaFilter } from 'app/arenas/shared/arena-filter';
import { AuthenticationService } from 'app/auth/authentication.service';
import { ArenaType } from './arena-type';
import { City } from './city';
import { ListResponse } from 'app/shared/list/list-response';
import { ListInfo } from 'app/shared/list/list-info';
import { ApiConfig } from 'app/core/api-config';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class ArenaService {
  constructor(
    private httpClient: HttpClient,
    private readonly authService: AuthenticationService,
    private readonly apiConfig: ApiConfig) {
  }

  public getArenas(filter: ArenaFilter, listInfo: ListInfo): Observable<ListResponse<ArenaListItem>> {
    const methodUrlPrefix = '/arenas' + '/list';

    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = listInfo.toParams();

    if (filter.arenaTypeId)
      params = params.append('arenaTypeId', filter.arenaTypeId.toString());
    if (filter.cityId)
      params = params.append('cityId', filter.cityId.toString());
    if (filter.searchText)
      params = params.append('searchText', filter.searchText);

    return this.httpClient.get<ListResponse<ArenaListItem>>(methodUrl, { params: params });
  }

  public getArena(id: number): Observable<ArenaViewItem> {
    const methodUrlPrefix = '/arenas/' + id;
    let methodUrl = this.getMethodUrl(methodUrlPrefix);

    return this.httpClient.get<ArenaViewItem>(methodUrl);
  }

  public getCities(): Observable<City[]> {
    const methodUrlPrefix = "/geo/cities";
    let methodUrl = this.getMethodUrl(methodUrlPrefix);

    return this.httpClient.get<City[]>(methodUrl);
  }

  public getArenaTypes(): Observable<ArenaType[]> {
    const methodUrlPrefix = '/arenas' + '/types';
    let methodUrl = this.getMethodUrl(methodUrlPrefix);

    return this.httpClient.get<ArenaType[]>(methodUrl);
  }

  public getArenaLogo(arena: ArenaListItem | ArenaViewItem): string {
    let logoSrc = this.apiConfig.filesPath;
    let placeholder = "assets/img/arenas/no_logo.png";
    return arena.logo ? logoSrc + arena.logo : placeholder;
  }

  public updateArena(id: number, arena: ArenaViewItem, arenaTypeId: number, cityId: number): Observable<ArenaViewItem> {
    console.log(arena);
    // const body = JSON.stringify(arena);
    // const body = JSON.stringify({"contacts": arena.contacts,"longitude": arena.longitude,"latitude": arena.latitude,"about": arena.about,"name": arena.name,"arenaTypeName": arena.arenaTypeName,"address": arena.address,"email": arena.email,"webSite": arena.webSite,"capacity": arena.capacity,"logo": arena.logo,"cityName": arena.cityName});
    const body = JSON.stringify({ "contacts": arena.contacts, "longitude": arena.longitude, "latitude": arena.latitude, "about": arena.about, "name": arena.name, "arenaTypeId": arenaTypeId.toString(), "address": arena.address, "email": arena.email, "webSite": arena.webSite, "capacity": arena.capacity, "logo": arena.logo, "cityId": cityId });
    console.log(body);
    // const body = JSON.stringify({"contacts":"+7 (3812) 70-71-25","longitude":73.297631,"latitude":55.008851,"about":null,"name":"«Арена Омск 6»","arenaTypeName":null,"address":"644119, г. Омск, ул. Лукашевича, д. 35","email":null,"webSite":"http://www.hawk.ru/tickets/arena-omsk/","capacity":10048,"logo":null,"cityName":null});
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      /*const headers = new HttpHeaders({
        'Content-Type': 'application/json-patch+json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + currentUser.token
      });*/
      //  const headers = new HttpHeaders({
      //   'Content-Type': 'application/json; charset=utf-8',
      //   'X-Requested-With': 'XMLHttpRequest',
      //   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluQGV4YW1wbGUuY29tIiwianRpIjoiNDI5YzNmZmMtOGFmOS00YjVmLTlkZmUtOTY4NTRmMmZmMGU0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTE4MDA5NTcwLCJpc3MiOiJodHRwOi8vbXljb2RlY2FtcC5pbyIsImF1ZCI6Imh0dHA6Ly9teWNvZGVjYW1wLmlvIn0.ZCHtyL_92NrqYei4gwu7Nygf2gY9SKAP4Myq8NB0fck' // + currentUser.token
      // });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.put<ArenaViewItem>(this.getMethodUrl('/arenas/' + id), body, { headers: headers });
    }
  }

  public addArena(arena: ArenaViewItem, arenaTypeId: number, cityId: number): Observable<number> {
    console.log(arena);
    const body = JSON.stringify({ "contacts": arena.contacts, "longitude": arena.longitude, "latitude": arena.latitude, "about": arena.about, "name": arena.name, "arenaTypeId": arenaTypeId.toString(), "address": arena.address, "email": arena.email, "webSite": arena.webSite, "capacity": arena.capacity, "logo": arena.logo, "cityId": cityId });
    console.log(body);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.post<number>(this.getMethodUrl('/arenas/'), body, { headers: headers });
    }
  }

  public deleteArena(id: number): Observable<void> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.delete<void>(this.getMethodUrl('/arenas/' + id), { headers: headers });
    }
  }

  public deleteLogo(id: number): Observable<void> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.delete<void>(this.getMethodUrl('/arenas/' + id + '/logo'), { headers: headers });
    }
  }

  public addLogo(id: number, image: any): Observable<string> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.post<string>(this.getMethodUrl('/arenas/' + id + '/logo'), image, { headers: headers });
    }
  }

  private getMethodUrl(methodUrlPrefix: string): string {
    return this.apiConfig.apiPath + methodUrlPrefix;
  }
}
