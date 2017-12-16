import { Component, Injectable, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { SchoolFilter } from "app/schools/shared/school-filter";
import { SchoolService } from "app/schools/shared/school.service";
import { ListResponse } from "app/shared/list/list-response";
import { ListInfo } from "app/shared/list/list-info";
import { PaginationService } from "app/shared/pagination.service";
import { SortOption } from "app/shared/sorting/sort-option";
import { SchoolListItem } from "app/schools/shared/school";

@Component({
  moduleId: module.id,
  selector: "schools",
  templateUrl: "schools.component.html"
})

@Injectable()
export class SchoolsComponent implements OnInit {
  schoolList: ListResponse<SchoolListItem>;

  filter: SchoolFilter = new SchoolFilter();
  listInfo: ListInfo = new ListInfo();
  sortOptions: SortOption[] = new Array<SortOption>();
  pageSize: number;

  private sub : any;

  constructor(
    private readonly schoolService: SchoolService,
    private readonly paginationService: PaginationService,
    private activatedRoute: ActivatedRoute) {
        
      this.pageSize = this.paginationService.pageSize;

      this.sortOptions = [
        { title: "Название", value: "Name" },
        { title: "Город", value: "CityName" }
      ];
  }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      this.listInfo.createFromParams(params, this.pageSize);
      this.getSchools();
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  public onFiltered($event){
    this.getSchools();
  }

  public onSorted($event){
    this.listInfo.orderBy = $event.orderBy;
    this.listInfo.orderDir = $event.orderDir;

    this.getSchools();
  }

  private getSchools() {
    this.schoolService.getSchools(this.filter, this.listInfo)
    .subscribe(schools => this.schoolList = schools);
  }
}
