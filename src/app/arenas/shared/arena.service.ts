import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
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


@Injectable()
export class ArenaService
{
  constructor(private http: Http) {
  }

  public getArenas(filter: ArenaFilter): Promise<ListResponse<ArenaListItem>> {
    const methodUrlPrefix = "/list";
    let methodUrl = this.getMethodUrl(methodUrlPrefix);

    let arenas = this.http.get(methodUrl) // todo handle filter
      .toPromise()
      .then(this.extractArenas)
      .catch(this.handleError);
    return arenas;
  }

  public getArena(id: number): Promise<ArenaViewItem> {
    const methodUrlPrefix = "/" + id;
    let methodUrl = this.getMethodUrl(methodUrlPrefix);

    let arena = this.http.get(methodUrl)
      .toPromise()
      .then(this.extractArena)
      .catch(this.handleError);
    return arena;
  }

  public getArenaTypes(): Promise<ArenaType[]> {
    const methodUrlPrefix = "/types";
    let methodUrl = this.getMethodUrl(methodUrlPrefix);

    let arenatypes = this.http.get(methodUrl)
      .toPromise()
      .then(this.extractArenasTypes)
      .catch(this.handleError);
    return arenatypes;
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

  private extractArenas( response: Response ) : ListResponse<ArenaListItem> {
    return response.json() as ListResponse<ArenaListItem>;
  }

  private extractArena(response: Response): ArenaViewItem {
    return response.json() as ArenaViewItem;
  }

  private extractArenasTypes( response: Response ) : ArenaType[] {
    return response.json() as ArenaType[];
  }

  private handleError( error: any ): any {
    let message = "";

    if ( error instanceof Response ) {
      let errorData = error.json().error || JSON.stringify(error.json());
      message = `${error.status} - ${error.statusText || ''} ${errorData}`
    } else {
      message = error.message ? error.message : error.toString();
    }

    console.error(message);

    return Observable.throw(message);
  }
}
