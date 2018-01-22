import { ApiConfig } from 'app/core/api-config';
import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {isNull} from "util";
import { PermissionService } from 'angular2-permission';

@Injectable()
export class AuthenticationService {
  private urlGetToken = '/account/generate-token/';
  //private urlLogout = '/account/logout/';
  public token: string;

  constructor(private httpClient: HttpClient,
              private readonly apiConfig: ApiConfig,
              private permissionService: PermissionService) {
    // set token if saved in local storage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  getToken() {
    return this.token;
  }

  login(username: string, password: string): Observable<boolean> {
    if (isNull(this.token)) {
      const body = JSON.stringify({
        email: username,
        password: password, rememberMe: true
      });
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        "X-Requested-With": "XMLHttpRequest"
      });
      return this.httpClient.post(this.getMethodUrl(this.urlGetToken), body, {headers: headers})
        .map((response: Response) => {
          const token = response['token'];
          if (token) {
            this.token = token;
            // TODO проверка существования роли
            localStorage.setItem('currentUser', JSON.stringify({username: username, token: token, roles: response['roles']}));
            // let i = response['roles'].length;
            // while (i--) {
            //   this.permissionService.add(response['roles'][i]);
            // }
            console.log(this.permissionService.store);
            return true;
          } else {
            return false;
          }
        });
    }
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    this.permissionService.clearStore();
  }

  private getMethodUrl(methodUrlPrefix: string): string {
    return this.apiConfig.apiPath + methodUrlPrefix;
  }
}

