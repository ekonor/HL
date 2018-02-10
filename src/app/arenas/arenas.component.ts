import { Component, Injectable, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ArenaFilter } from "app/arenas/shared/arena-filter";
import { ArenaService } from "app/arenas/shared/arena.service";
import { ArenaListItem } from "app/arenas/shared/arena-list-item";
import { ListResponse } from "app/shared/list/list-response";
import { ListInfo } from "app/shared/list/list-info";
import { PaginationService } from "app/shared/pagination.service";
import { SortOption } from "app/shared/sorting/sort-option";

@Component({
  moduleId: module.id,
  selector: "arenas",
  templateUrl: "arenas.component.html"
  // styleUrls: ["arenas.component.scss"]
})

@Injectable()
export class ArenasComponent implements OnInit {
  arenaList: ListResponse<ArenaListItem>;
  errorMessage: string;

  filter: ArenaFilter = new ArenaFilter();
  listInfo: ListInfo = new ListInfo();
  sortOptions: SortOption[] = new Array<SortOption>();
  pageSize: number;
  dataIsLoading: boolean;

  private sub : any;

  constructor(
    private readonly arenaService: ArenaService,
    private readonly paginationService: PaginationService,
    private activatedRoute: ActivatedRoute) {
      this.pageSize = this.paginationService.pageSize;

      this.sortOptions = [
        { title: "Название", value: "Name" },
        { title: "Город", value: "CityName" },
        { title: "Тип", value: "ArenaTypeName" }
      ];
  }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      this.listInfo.createFromParams(params, this.pageSize);
      this.getArenas();
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  public onFiltered($event){
    this.getArenas();
  }

  public onSorted($event){
    this.listInfo.orderBy = $event.orderBy;
    this.listInfo.orderDir = $event.orderDir;

    this.getArenas();
  }

  private getArenas() {
  this.dataIsLoading = true;
    this.arenaService.getArenas(this.filter, this.listInfo)
    .subscribe(
      arenas => {
        this.arenaList = arenas;
      },
      error => this.errorMessage = error,
      () => this.dataIsLoading = false
    );
  }
}
