import { Component, OnInit } from '@angular/core';
import { NewsListResponse, NewsListItem } from './news';
import { NewsService } from './news.service';
import { ListBaseComponent } from "app/common/list/list-base.component";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-hockey-news',
  templateUrl: './hockey-news.component.html',
  styleUrls: ['./hockey-news.component.scss'],
  providers: [NewsService]
})
export class HockeyNewsComponent extends ListBaseComponent<NewsListItem> {
  constructor(private readonly newsService: NewsService) {
    super();

    this.title='Новости хоккейного мира';
  }

  protected getListData(): Observable<NewsListResponse> {
    return this.newsService.getNewsList(this.listInfo)
  }
}
