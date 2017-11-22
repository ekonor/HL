import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/http';
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
      /*.map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json();
        if (token && token.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //localStorage.setItem('currentUser', JSON.stringify(user));
          console.log("ssss");
        }

        return token;
      });*/
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
