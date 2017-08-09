import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs } from '@angular/http';
import {Observable} from "rxjs/Observable";


@Injectable()
export class ArenasService {

  private arenasUrl : string = `/api/v1/arenas`;

  constructor(private http: Http) { }

  getArenasList (): Observable<any> {
    return this.http.get(this.arenasUrl + '/list')

  }
}
