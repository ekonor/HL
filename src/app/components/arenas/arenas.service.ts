import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs } from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {ArenasItem, ArenasListResponse} from "./arenas";
import { ListInfo } from 'app/common/list/list-info'


@Injectable()
export class ArenasService {

  private arenasUrl : string = ` http://hockey.smargit.com/Hockeyapp.WebApi/api/v1/arenas`;

  constructor(private http: Http) { }

  public getArenasList(listInfo: ListInfo): Observable<ArenasListResponse> {
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");

    let params = new URLSearchParams();
    for(let key in listInfo){
      params.append(key.toString(), listInfo[key]);
    }

    let requestOptions =  new RequestOptions({ headers: headers, params: params } as any);

    return this.http.get(`${this.arenasUrl}/list`, requestOptions)
      .map(response => response.json() as ArenasListResponse);
  }

  public getArenasItem(id: number): Promise<ArenasItem> {
    const url = `${this.arenasUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as ArenasItem)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
