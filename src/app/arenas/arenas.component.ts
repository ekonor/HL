import { Component, Injectable, OnInit } from "@angular/core";

import { ArenaFilter } from "app/arenas/shared/arena-filter";
import { ArenaService } from "app/arenas/shared/arena.service";
import { ArenaListItem } from "app/arenas/shared/arena-list-item";
import { ListResponse } from "app/shared/list/list-response";

@Component({
  moduleId: module.id,
  selector: "arenas",
  templateUrl: "arenas.component.html",
  styleUrls: ["arenas.component.scss"]
})

@Injectable()
export class ArenasComponent implements OnInit {
  arenaList: ListResponse<ArenaListItem>;
  errorMessage: string;

  /**
   * @type {number} numberOfArenas The number of arenas, used for max attribute for limit and page.
   */
  numberOfArenas: number;
  /**
   * @type {number} limit The number of arenas per page.
   */
  limit: number;

  /**
   * @type {number} page The current page.
   */
  page: number = 1;

  filter: ArenaFilter = new ArenaFilter();

  pages: number;

  constructor(private service: ArenaService) {
  }

  ngOnInit() {
    // todo заполнить фильтр из url

    this.getArenas(); 
  }

  public refresh() {
    this.getArenas();
  }


  private getArenas() {
    this.service.getArenas(this.filter)
    .then(
      arenas =>  this.arenaList = arenas,
      error => this.errorMessage = error
    );

    // todo calculate paging
  }
}
