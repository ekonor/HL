import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import { ArenaListItem } from 'app/arenas/shared/arena-list-item';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { Arena } from 'app/arenas/shared/arena';
import { ArenaFilter } from 'app/arenas/shared/arena-filter';
import { AuthenticationService } from 'app/core/auth/authentication.service';
import { ArenaType } from './arena-type';
import { City } from '../../core/geo/city';
import { ListResponse } from 'app/shared/list/list-response';
import {ListInfo, SortDir} from 'app/shared/list/list-info';
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
    console.log("eeeee",params.toString());
    if (filter.arenaTypeId)
      params = params.append('arenaTypeId', filter.arenaTypeId.toString());
    if (filter.cityId)
      params = params.append('cityId', filter.cityId.toString());
    if (filter.searchText)
      params = params.append('searchText', filter.searchText);
    console.log(params.toString());

    return this.httpClient.get<ListResponse<ArenaListItem>>(methodUrl, { params: params });
  }

  /*public getArenasR(filter: ArenaFilter, listInfo: ListInfo): Observable<ListResponse<ArenaListItem>> {
    const methodUrlPrefix = '/arenas' + '/list';

    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = listInfo.toParams();
    console.log("eeeee",params);
    if (filter.arenaTypeId)
      params = params.append('arenaTypeId', filter.arenaTypeId.toString());
    if (filter.cityId)
      params = params.append('cityId', filter.cityId.toString());
    if (filter.searchText)
      params = params.append('searchText', filter.searchText);
    console.log(params.toString());

    return this.httpClient.get<ArenaListItem[]>(methodUrl, { params: params });
  }*/

 /* public getArenasList(searchTerm: string): Observable<ListResponse<ArenaListItem>> {
    if (searchTerm === '') {
      return of([]);
    }
    const filter = new ArenaFilter({searchText: searchTerm});
    let listInfo = new ListInfo();
    listInfo.orderBy = 'Name';
    listInfo.skip = 0;
    listInfo.take = 10;
    listInfo.orderDir = SortDir.Asc;*/
    //({skip: 0, take: 10, orderBy: 'Name', orderDir: SortDir.Asc});
    /*let arenaList = new ListResponse<ArenaListItem>();
    this.getArenas(filter, listInfo)
      .subscribe(
        arenas => {
          arenaList = arenas;
        }
      );*/
    //return <ListResponse<ArenaListItem>> this.getArenas(filter, listInfo);
    //return arenaList;
    //const res = arenaList.listItems;
    //return new Observable<ArenaListItem[]>(res);
    //const res =  this.getArenas(filter, listInfo);
    // arr =  <ArenaListItem[]>(res.listItems);
    /*this.getArenas(filter, listInfo)
      .subscribe((result) => {
        return <ArenaListItem[]>(<ListResponse<ArenaListItem>>(result));
      });
*/
    //console.log(res.listItems);


    /*const methodUrlPrefix = '/arenas' + '/list';

    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = listInfo.toParams();
    console.log("eeeee",params);
    if (filter.searchText)
      params = params.append('searchText', filter.searchText);
    console.log(params.toString());*/

    //return this.httpClient.get<ListResponse<ArenaListItem>>(methodUrl, { params: params });

    /*if (!res) {
      return of([]);
    }*/
    //console.log(res);
    //return res['listItems'];
    //filter.searchText = searchTerm;
    /*const methodUrlPrefix = '/arenas' + '/list';
    let methodUrl = this.getMethodUrl(methodUrlPrefix);

    let params = new HttpParams();
    params = params.append('searchText', searchTerm);*/
    /*if (countryId) {
      params = params.append('countryId', countryId.toString());
    }*/


    //<ListResponse<ArenaListItem>> a;
    /*a = this.httpClient.get<ListResponse<ArenaListItem[]>>(methodUrl, { params: params });
    if (!a) {
      return of([]);
    }
    return a['listItems'];*/
 // }


  /*public getArenasList(filter: ArenaFilter, listInfo: ListInfo): Observable<ArenaListItem> {
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
  }*/

  public getArena(id: number): Observable<ArenaViewItem> {
    const methodUrlPrefix = '/arenas/' + id;
    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    return this.httpClient.get<ArenaViewItem>(methodUrl);
  }

  /*public getCities(searchTerm: string): Observable<City[]> {
    if (searchTerm === '') {
      return of([]);
    }
    const methodUrlPrefix = '/geo/cities';
    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = new HttpParams();
    params = params.append('searchTerm', searchTerm);
    return this.httpClient.get<City[]>(methodUrl, { params: params });
  }*/

  public getArenaTypes(): Observable<ArenaType[]> {
    const methodUrlPrefix = '/arenas' + '/types';
    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    return this.httpClient.get<ArenaType[]>(methodUrl);
  }

  public getArenaLogo(arena: ArenaListItem | ArenaViewItem | Arena ): string {
    let logoSrc = this.apiConfig.filesPath;
    let placeholder = "assets/img/arenas/no_logo.png";
    return arena.logo ? logoSrc + arena.logo : placeholder;
  }

  public updateArena(id: number, arena: ArenaViewItem): Observable<ArenaViewItem> {
    console.log(arena);
    const body = JSON.stringify({
      'name': arena.name,
      'fullName': (arena.fullName ? arena.fullName : arena.name),
      'cityId': arena.city.id,
      'arenaTypeId': arena.arenaTypeId,
      'startYear': arena.startYear,
      'address': arena.address,
      'email': arena.email,
      'webSite': arena.webSite,
      'contacts': arena.contacts,
      'capacity': arena.capacity,
      'about': arena.about
    });
    console.log(body);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.put<ArenaViewItem>(this.getMethodUrl('/arenas/' + id), body, { headers: headers });
    }
  }

  public addArena(arena: ArenaViewItem): Observable<number> {
    console.log(arena);
    const body = JSON.stringify({
      'name': arena.name,
      'fullName': (arena.fullName ? arena.fullName : arena.name),
      'cityId': arena.city.id,
      'arenaTypeId': arena.arenaTypeId,
      'startYear': arena.startYear,
      'address': arena.address,
      'email': arena.email,
      'webSite': arena.webSite,
      'contacts': arena.contacts,
      'capacity': arena.capacity,
      'about': arena.about
    });
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
