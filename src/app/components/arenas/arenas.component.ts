import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ArenasService} from "./arenas.service";
import {ListBaseComponent} from "../../common/list/list-base.component";
import {ArenasListItem, ArenasListResponse} from "./arenas";




@Component({
  selector: 'app-arenas',
  templateUrl: './arenas.component.html',
  styleUrls: ['./arenas.component.scss'],
  providers: [ArenasService]
})
export class ArenasComponent extends ListBaseComponent<ArenasListItem> {
  constructor(private readonly arenasService: ArenasService) {
    super();

    this.title='Все хоккейные арены и площадки';
  }

  protected getListData(): Observable<ArenasListResponse> {
    return this.arenasService.getArenasList(this.listInfo)
  }
}


