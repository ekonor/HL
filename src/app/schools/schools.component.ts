import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SchoolFilter } from 'app/schools/shared/school-filter';
import { SchoolService } from 'app/schools/shared/school.service';
import { SchoolListItem } from 'app/schools/shared/school-list-item';
import { ListResponse } from 'app/shared/list/list-response';
import { ListInfo } from 'app/shared/list/list-info';
import { PaginationService } from 'app/shared/pagination.service';
import { SortOption } from 'app/shared/sorting/sort-option';


@Component({
  moduleId: module.id,
  selector: 'schools',
  templateUrl: 'schools.component.html'
})

@Injectable()
export class SchoolsComponent implements OnInit {
  schoolList: ListResponse<SchoolListItem>;
  errorMessage: string;

  filter: SchoolFilter = new SchoolFilter();
  listInfo: ListInfo = new ListInfo();
  sortOptions: SortOption[] = new Array<SortOption>();
  pageSize: number;
  dataIsLoading: boolean;

  private sub: any;

  constructor(
    private readonly schoolService: SchoolService,
    private readonly paginationService: PaginationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.pageSize = this.paginationService.pageSize;

      this.sortOptions = [
        { title: "Название", value: "Name" },
        { title: "Город", value: "CityName" },
        { title: "Тип", value: "SchoolTypeName" }
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

  getAddIconClass() {
    return this.schoolService.getAddIconClass();
  }

  public addSchool(): void {
    this.router.navigate([ "schools/create"]);
  }

  private getSchools() {
  this.dataIsLoading = true;
    this.schoolService.getSchools(this.filter, this.listInfo)
    .subscribe(
      schools => {
        this.schoolList = schools;
      },
      error => this.errorMessage = error,
      () => this.dataIsLoading = false
    );
  }

}
