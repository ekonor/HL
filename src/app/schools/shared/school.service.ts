import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import { SchoolListItem } from 'app/schools/shared/school-list-item';
import { SchoolViewItem } from 'app/schools/shared/school-view-item';
import { School } from 'app/schools/shared/school';
import { SchoolFilter } from 'app/schools/shared/school-filter';
import { AuthenticationService } from 'app/core/auth/authentication.service';
import { SchoolType } from 'app/schools/shared/school-type';
import { City } from 'app/core/geo/city';
import { ListResponse } from 'app/shared/list/list-response';
import { ListInfo, SortDir } from 'app/shared/list/list-info';
import { ApiConfig } from 'app/core/api-config';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class SchoolService {
  constructor(
    private httpClient: HttpClient,
    private readonly authService: AuthenticationService,
    private readonly apiConfig: ApiConfig) {
  }

  public getSchools(filter: SchoolFilter, listInfo: ListInfo): Observable<ListResponse<SchoolListItem>> {
    const methodUrlPrefix = '/schools' + '/list';
    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = new HttpParams();
    if (filter.schoolTypeId)
      params = params.append('arenaTypeId', filter.schoolTypeId.toString());
    if (filter.cityId)
      params = params.append('cityId', filter.cityId.toString());
    if (filter.searchText)
      params = params.append('searchText', filter.searchText);
    console.log(params);

    return this.httpClient.get<ListResponse<SchoolListItem>>(methodUrl, { params: params });
  }

  public getSchool(id: number): Observable<SchoolViewItem> {
    const methodUrlPrefix = '/schools/' + id;
    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    return this.httpClient.get<SchoolViewItem>(methodUrl);
  }

  public getSchoolTypes(): Observable<SchoolType[]> {
    const methodUrlPrefix = '/schools' + '/types';
    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    return this.httpClient.get<SchoolType[]>(methodUrl);
  }

  public getSchoolLogo(school: SchoolListItem | SchoolViewItem | School ): string {
    let logoSrc = this.apiConfig.filesPath;
    let placeholder = 'assets/img/schools/no_logo.png';
    return school.logo ? logoSrc + school.logo : placeholder;
  }

  public updateSchool(id: number, school: SchoolViewItem): Observable<SchoolViewItem> {
    // TODO свернуть
    const body = JSON.stringify({
      /*'name': arena.name,
      'fullName': (arena.fullName ? arena.fullName : arena.name),
      'cityId': arena.city.id,
      'arenaTypeId': arena.arenaTypeId,
      'startYear': arena.startYear,
      'address': arena.address,
      'email': arena.email,
      'webSite': arena.webSite,
      'contacts': arena.contacts,
      'capacity': arena.capacity,
      'about': arena.about*/
    });
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.put<SchoolViewItem>(this.getMethodUrl('/schools/' + id), body, { headers: headers });
    }
  }

  public addSchool(school: SchoolViewItem): Observable<number> {
    // TODO свернуть
    const body = JSON.stringify({
      /*'name': arena.name,
      'fullName': (arena.fullName ? arena.fullName : arena.name),
      'cityId': arena.city.id,
      'arenaTypeId': arena.arenaTypeId,
      'startYear': arena.startYear,
      'address': arena.address,
      'email': arena.email,
      'webSite': arena.webSite,
      'contacts': arena.contacts,
      'capacity': arena.capacity,
      'about': arena.about*/
    });
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.post<number>(this.getMethodUrl('/schools/'), body, { headers: headers });
    }
  }

  public deleteSchool(id: number): Observable<void> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.delete<void>(this.getMethodUrl('/schools/' + id), { headers: headers });
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
      return this.httpClient.delete<void>(this.getMethodUrl('/schools/' + id + '/logo'), { headers: headers });
    }
  }

  public addLogo(id: number, image: any): Observable<string> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.post<string>(this.getMethodUrl('/schools/' + id + '/logo'), image, { headers: headers });
    }
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
