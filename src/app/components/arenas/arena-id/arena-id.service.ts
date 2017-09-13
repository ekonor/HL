import {Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {ArenasItem} from "../arenas";
import 'rxjs/Rx';

@Injectable()

export class ArenaIdService {

  private arenasUrl : string = `http://87.117.9.216/Hockeyapp.WebApi/api/v1/arenas`;

  constructor(private http: Http) { }




  public getArenasItem(id: number) {
    const url = `${this.arenasUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(res => this.extractArena(res));

  }

  public extractArena(res:Response) {
    var arenas = res.json() as ArenasItem;
    return arenas;
  }

}
