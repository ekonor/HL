import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import {of} from 'rxjs/observable/of';

import { TournamentAnnouncementListItem } from 'app/tournament-announcements/shared/tournament-announcement-list-item';
import { TournamentAnnouncementFilter } from 'app/tournament-announcements/shared/tournament-announcement-filter';
import { TournamentAnnouncementViewItem } from 'app/tournament-announcements/shared/tournament-announcement-view-item';
import { TournamentAnnouncement } from 'app/tournament-announcements/shared/tournament-announcement';
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

    console.log(filter.cityId);
    const methodUrl = this.getMethodUrl(methodUrlPrefix);
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

    console.log(filter);

    return this.httpClient.get<ListResponse<TournamentAnnouncementListItem>>(methodUrl, { params: params });
  }

  public getTournamentAnnouncementsAdmin(filter: TournamentAnnouncementFilter, listInfo: ListInfo): Observable<ListResponse<TournamentAnnouncementListItem>> {
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
    // console.log(filter);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token && currentUser.roles) {
      let methodUrlPrefix;
      if (currentUser.roles.indexOf('TournamentAnnouncementModerator') !== -1) {
        methodUrlPrefix = '/tournament-announcements' + '/tournament-moderator-list';
      } else if (currentUser.roles.indexOf('TournamentAdministrator') !== -1) {
        methodUrlPrefix = '/tournament-announcements' + '/tournament-admin-list';
      }
      const methodUrl = this.getMethodUrl(methodUrlPrefix);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.get<ListResponse<TournamentAnnouncementListItem>>(methodUrl, {
        params: params,
        headers: headers
      });
    }
  }

  public getTournamentAnnouncementLogo(tournamentAnnouncement: TournamentAnnouncementListItem | TournamentAnnouncementViewItem ): string {
    const logoSrc = this.apiConfig.filesPath;
    const placeholder = "assets/img/arenas/no_logo.png"; // TODO
    return tournamentAnnouncement.logo ? logoSrc + tournamentAnnouncement.logo : placeholder;
  }

  public getTournamentAnnouncement(id: number): Observable<TournamentAnnouncementViewItem> {
    const methodUrlPrefix = '/tournament-announcements/' + id;
    const methodUrl = this.getMethodUrl(methodUrlPrefix);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.get<TournamentAnnouncementViewItem>(methodUrl,{ headers: headers });
    }
    return this.httpClient.get<TournamentAnnouncementViewItem>(methodUrl);
  }

  public getRequiredResponseCountText(tournamentAnnouncement: TournamentAnnouncementListItem | TournamentAnnouncementViewItem | TournamentAnnouncement ) {
    return tournamentAnnouncement.requiredResponseCount ? tournamentAnnouncement.requiredResponseCount + '' : this.getNoData();
  }

  public getAgeGroupIconClass(tournamentAnnouncement: TournamentAnnouncementListItem | TournamentAnnouncementViewItem | TournamentAnnouncement ) {
    return tournamentAnnouncement.ageGroup === 'Children' ? 'fa fa-child' : 'fa fa-male';
  }

  public getGenderIconClass(tournamentAnnouncement: TournamentAnnouncementListItem | TournamentAnnouncementViewItem | TournamentAnnouncement ) {
    return tournamentAnnouncement.gender === 'Female' ? 'fa fa-female' : 'fa fa-male';
  }
// TODO вынести в общий класс
  public getCloseIconClass(): string {
    return 'fa fa-hand-stop-o';
  }

  public getCancelIconClass(): string {
    return 'fa fa-ban';
  }

  public getSendOnModerationIconClass(): string {
    return 'fa fa-mail-forward';
  }

  public getDeleteIconClass(): string {
    return 'fa fa-close';
  }

  public getEditIconClass(): string {
    return 'fa fa-pencil';
  }

  public getModerationIconClass(flag: boolean): string {
    return flag ? 'fa fa-check' : 'fa fa-ban';
  }
  public getStateClass(tournamentAnnouncement: TournamentAnnouncementListItem | TournamentAnnouncementViewItem ) {
    let stateClass = '';
    switch(tournamentAnnouncement.state) {
      case 'Draft': {
        stateClass = 'table-active';
        break;
      }
      case 'WaitModeration': {
        stateClass = 'table-warning';
        break;
      }
      case 'ApprovedByModerator': {
        stateClass = 'table-success';
        break;
      }
      case 'RejectedByModerator': {
        stateClass = 'table-danger';
        break;
      }
      case 'Canceled': {
        //statements;
        break;
      }
      case 'Deleted': {
        //statements;
        break;
      }
      case 'Finished': {
        //statements;
        break;
      }
      default: {
        //statements;
        break;
      }
    }
    return stateClass;
  }

  public getStateTitle(tournamentAnnouncement: TournamentAnnouncementListItem | TournamentAnnouncementViewItem ) {
    let stateTitle = '';
    switch(tournamentAnnouncement.state) {
      case 'Draft': {
        stateTitle = 'Черновик';
        break;
      }
      case 'WaitModeration': {
        stateTitle = 'Анонс ожидает модерации';
        break;
      }
      case 'ApprovedByModerator': {
        stateTitle = 'Анонс одобрен модератором';
        break;
      }
      case 'RejectedByModerator': {
        stateTitle = 'Анонс отклонен модератором';
        break;
      }
      case 'Canceled': {
        stateTitle = 'Прием заявок завершен';
        break;
      }
      case 'Deleted': {
        stateTitle = 'Турнир отменен';
        break;
      }
      case 'Finished': {
        stateTitle = 'Турнир завершен';
        break;
      }
      default: {
        //statements;
        break;
      }
    }
    return stateTitle;
  }

  public getCostText(tournamentAnnouncement: TournamentAnnouncementListItem | TournamentAnnouncementViewItem | TournamentAnnouncement ) {
    if (tournamentAnnouncement.isCommercial) {
      if (tournamentAnnouncement.cost) {
        return tournamentAnnouncement.costType === 'PerTeam' ? tournamentAnnouncement.cost + '/команда' : tournamentAnnouncement.cost + '/чел.';
      } else {
        return this.getNoData();
      }
    }
    return 'бесплатно';
  }
  private getMethodUrl(methodUrlPrefix: string): string {
    return this.apiConfig.apiPath + methodUrlPrefix;
  }

  public getNoData() {
    //return 'не определено';
    return '';
  }

  public sendOnModeration(id: number): Observable<number> {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
        const body = JSON.stringify({'id': id});
        const headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + currentUser.token
        });
        return this.httpClient.post<number>(this.getMethodUrl('/tournament-announcements/' + id + '/send-on-moderation'), body, {headers: headers});
      }
  }

  public cancelTournamentAnnouncement(id: number): Observable<number> {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
        const body = JSON.stringify({'state': 'Deleted'});
        const headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + currentUser.token
        });
        return this.httpClient.post<number>(this.getMethodUrl('/tournament-announcements/' + id + '/close'), body, {headers: headers});
      }
  }

  public moderateTournamentAnnouncement(id: number, flag: boolean): Observable<number> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const body = JSON.stringify({'state': ( flag ? 'ApprovedByModerator' : 'RejectedByModerator' )});
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.post<number>(this.getMethodUrl('/tournament-announcements/' + id + '/moderate'), body, {headers: headers});
    }
  }

  public closeTournamentAnnouncement(id: number): Observable<number> {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
        const body = JSON.stringify({'state': 'Canceled'});
        const headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + currentUser.token
        });
        return this.httpClient.post<number>(this.getMethodUrl('/tournament-announcements/' + id + '/close'), body, {headers: headers});
      }
  }

  /*public updateQuickTournamentAnnouncement(id: number, ta: TournamentAnnouncementListItem): Observable<TournamentAnnouncementListItem> {
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
  }*/

  public addTournamentAnnouncement(ta: TournamentAnnouncement): Observable<number> {
      console.log(ta);
      const body = JSON.stringify({
        'name': ta.name,
        /*'startDate': ta.startDate ? ta.startDate + 'T00:00:00.000Z' : null,
        'endDate': ta.endDate ? ta.endDate + 'T00:00:00.000Z' : null,*/
        'startDate': ta.startDate ? ta.startDate.toISOString() : null,
        'endDate': ta.endDate ? ta.endDate.toISOString() : null,
        'content': ta.content,
        'requiredResponseCount': ta.requiredResponseCount.toString(),
        // 'endRegistrationDate': ta.endRegistrationDate ? ta.endRegistrationDate + 'T00:00:00.000Z' : null, // TODO NEED FIX!!! убрать время и этот костыль!
        'endRegistrationDate': ta.endRegistrationDate ? ta.endRegistrationDate.toISOString() : null, // TODO NEED FIX!!! убрать время и этот костыль!
        'cityId': ta.cityId,
        'arenaId': ta.arenaId,
        'isCommercial': ta.isCommercial,
        'cost': ta.isCommercial ? ta.cost : null,
        'costType': ta.isCommercial ? ta.costType : null,
        'ageGroup': ta.ageGroup,
        'minBirthYear': 0, //ta.minBirthYear,//
        'maxBirthYear': 0, //ta.maxBirthYear, //
        'gender': ta.gender,
        'closeCondition': ta.closeCondition //'ResponseCountAccomplished'
      });
      console.log(body);
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + currentUser.token
        });
        return this.httpClient.post<number>(this.getMethodUrl('/tournament-announcements/'), body, {headers: headers});
      }
  }

  public updateTournamentAnnouncement(ta: TournamentAnnouncementViewItem): Observable<number> {
      console.log(ta);
      const body = JSON.stringify({
        'name': ta.name,
        /*'startDate': ta.startDate ? ta.startDate + 'T00:00:00.000Z' : null,
        'endDate': ta.endDate ? ta.endDate + 'T00:00:00.000Z' : null,*/
        'startDate': ta.startDate ? ta.startDate.toISOString() : null,
        'endDate': ta.endDate ? ta.endDate.toISOString() : null,
        'content': ta.content,
        'requiredResponseCount': ta.requiredResponseCount.toString(),
        // 'endRegistrationDate': ta.endRegistrationDate ? ta.endRegistrationDate + 'T00:00:00.000Z' : null, // TODO NEED FIX!!! убрать время и этот костыль!
        'endRegistrationDate': ta.endRegistrationDate ? ta.endRegistrationDate.toISOString() : null, // TODO NEED FIX!!! убрать время и этот костыль!
        'cityId': ta.city ? ta.city.id : null,
        'arena': ta.arena ? ta.arena.id : null,
        'isCommercial': ta.isCommercial,
        'cost': ta.isCommercial ? ta.cost : null,
        'costType': ta.isCommercial ? ta.costType : null,
        'ageGroup': ta.ageGroup,
        'minBirthYear': 0, //ta.minBirthYear,//
        'maxBirthYear': 0, //ta.maxBirthYear, //
        'gender': ta.gender,
        'closeCondition': ta.closeCondition //'ResponseCountAccomplished'
      });
      console.log(body);
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + currentUser.token
        });
        return this.httpClient.put<number>(this.getMethodUrl('/tournament-announcements/'+ta.id), body, {headers: headers});
      }
   // }
  }

  public deleteTournamentAnnouncement(id: number): Observable<void> {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
        let params = new HttpParams();
        params.append('id', id.toString());
        const headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + currentUser.token
        });
        return this.httpClient.delete<void>(this.getMethodUrl('/tournament-announcements/' + id), {params: params, headers: headers});
      }
  }

 /* public deleteLogo(id: number): Observable<void> {
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
*/
 // TODO NEED FIX - убрать костыль!!!
  public getYYYYMMDD(dt_value: Date): string {
    const dt = new Date(dt_value);
    const mm = dt.getMonth() + 1; // getMonth() is zero-based
    const dd = dt.getDate();
    return [dt.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-');
  }
}
