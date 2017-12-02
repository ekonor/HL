import { Component, Injectable, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ArenaFilter } from "app/arenas/shared/arena-filter";
import { ArenaService } from "app/arenas/shared/arena.service";
import { ArenaListItem } from "app/arenas/shared/arena-list-item";
import { ListResponse } from "app/shared/list/list-response";
import { ListInfo } from "app/shared/list/list-info";

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

  filter: ArenaFilter = new ArenaFilter();
  listInfo: ListInfo = new ListInfo(); 

  constructor(
    private readonly arenaService: ArenaService,
    private readonly activatedRoute : ActivatedRoute) {
  }

  ngOnInit() {
    // todo заполнить фильтр из url
    this.activatedRoute.params.subscribe(params => {
      debugger;
      var page =  params["page"] || 1;
      let pageSize = 10;

      this.listInfo.skip = pageSize * (page - 1);;
      this.listInfo.take = pageSize;

      this.getArenas(); 
    });
  }

  public onFiltered($event){
    this.getArenas();
  }

  private getArenas() {
    this.arenaService.getArenas(this.filter, this.listInfo)
    .subscribe(
      arenas => {
        this.arenaList = arenas;
      },
      error => this.errorMessage = error
    );

    // todo calculate paging
  }
}
