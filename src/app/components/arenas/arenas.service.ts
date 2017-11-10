import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Arena } from './arenas';
import { ArenaType } from "./arenas-types";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ArenasService
{
  //  Адрес API
  private url = "http://hockey.smargit.com/HockeyApp.WebApi/api/v1/arenas";

  constructor(private http: Http) {
  }

  public getArenas(): Promise<Arena[]> {
    //console.log(this.http.get(this.url));
    let arenas = this.http.get(this.url + "/" + "list")
      .toPromise()
      .then(this.extractArenas)
      .catch(this.handleError);
    return arenas;
  }

  public getArena( id: string ): Promise<Arena> {
    let arena = this.http.get(this.url + "/" + id)
      .toPromise()
      .then(this.extractArena)
      .catch(this.handleError);
       //console.log(this.url + "/" + id);
    return arena;
  }

  public getArenasTypes(): Promise<ArenaType[]> {
    let arenastypes = this.http.get(this.url + "/" + "types")
      .toPromise()
      .then(this.extractArenasTypes)
      .catch(this.handleError);
    return arenastypes;
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
  private extractArenas( response: Response ) {
    let arenas = response.json()['listItems'] as Arena[];
    /*let products = response.json()['productList'] as Product[];
    console.log(res);
    let arenas: Arena[] = [];

    for ( let i = 0; i < res.length; i++ ) {
      arenas.push(new Arena({id: res[ i ].id, name: res[ i ].name}));
    }*/
    console.log(arenas);
    return arenas;
  }

  private extractArena( response: Response ) {
    let res = response.json();
    //let arena = new Arena({id: res.id, name: res.name, logo: res.logo, cityName: });
    let arena = new Arena(res);

    return arena;
  }

  private extractArenasTypes( response: Response ) {
    let arenasTypes = response.json() as ArenaType[];
    /*let products = response.json()['productList'] as Product[];
    console.log(res);
    let arenas: Arena[] = [];

    for ( let i = 0; i < res.length; i++ ) {
      arenas.push(new Arena({id: res[ i ].id, name: res[ i ].name}));
    }*/
    console.log(arenasTypes);
    return arenasTypes;
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
