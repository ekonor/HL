/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  //  Адрес API
  private url = "http://hockey.smargit.com/HockeyApp.WebApi/api/v1/";
  private ulrGetToken = this.url+'/account/generate-token/';

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    const body = JSON.stringify({email: username,
    password: password, rememberMe: true});
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.httpClient.post(this.ulrGetToken, body, {headers: headers}).subscribe(
      (data) => {
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      }
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}*/



import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {isNull} from "util";

@Injectable()
export class AuthenticationService {
  //  Адрес API
  private url = "http://hockey.smargit.com/HockeyApp.WebApi/api/v1/";
  private ulrGetToken = this.url+'/account/generate-token/';
  private ulrLogout = this.url+'/account/logout/';
  public token: string;

  constructor(private httpClient: HttpClient) {
    // set token if saved in local storage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  getToken()
  {
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
      return this.httpClient.post(this.ulrGetToken, body, {headers: headers})
        .map((response: Response) => {
          const token = response['token'];
          if (token) {
            this.token = token;
            // TODO проверка существования роли
            localStorage.setItem('currentUser', JSON.stringify({username: username, token: token, roles: response['roles']}));
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
  }
}

