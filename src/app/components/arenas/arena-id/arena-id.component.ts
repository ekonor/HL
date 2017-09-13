import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Response} from "@angular/http";

@Component({
  selector: 'app-arena-id',
  templateUrl: './arena-id.component.html',
  styleUrls: ['./arena-id.component.scss'],
  providers: [ ]
})
export class ArenaIdComponent  {

  private arenaIdUrl: string = `http://87.117.9.216/Hockeyapp.WebApi/api/v1/arenas/29`;
  data: any = { };


  constructor(private http: Http) {

  console.log('Это наша арена');
  this.getData();
this.getArenaId();
}

    getData(id: number = 29) {
      const url = `${this.arenaIdUrl}/${id}`;
return this.http.get(url)
  .map((res: Response) => res.json())

}


getArenaId() {
  this.getData().subscribe(data =>{
    console.log(data);
    this.data = data
  })
}






}
