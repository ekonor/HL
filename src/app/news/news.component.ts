import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { NewsService } from 'app/news/shared/news.service';
import { NewsListItem } from 'app/news/shared/news';
import { ListInfo } from 'app/shared/list/list-info';
import { SortOption } from 'app/shared/sorting/sort-option';
import { ListResponse } from 'app/shared/list/list-response';
import { PaginationService } from 'app/shared/pagination.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  newsList: ListResponse<NewsListItem>;

  filter: string;
  listInfo: ListInfo = new ListInfo();
  sortOptions: SortOption[] = new Array<SortOption>();
  pageSize: number;

  private sub: any;

  constructor(
    private readonly newsService: NewsService,
    private readonly paginationService: PaginationService,
    private activatedRoute: ActivatedRoute) {
    this.pageSize = this.paginationService.pageSize;

    this.sortOptions = [
      { title: "Название", value: "Name" },
      // { title: "Город", value: "cityId" },
      // { title: "Тип", value: "arenaTypeId" } // todo replace ids to names here and in api
    ];
  }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      this.listInfo.createFromParams(params, this.pageSize);
      this.getListData();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onFiltered(searchText) {
    this.filter = searchText;
    this.getListData();
  }

  public onSorted($event) {
    this.listInfo.orderBy = $event.orderBy;
    this.listInfo.orderDir = $event.orderDir;

    this.getListData();
  }


  protected getListData() {
    this.newsService.getNewsList(this.filter, this.listInfo).subscribe(data => this.newsList = data);
  }
}
