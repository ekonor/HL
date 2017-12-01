import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ListBaseComponent } from 'app/shared/list/list-base.component';
import { NewsService } from 'app/news/shared/news.service';
import { NewsListItem, NewsListResponse } from 'app/news/shared/news';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [NewsService]
})
export class NewsComponent extends ListBaseComponent<NewsListItem> {
  constructor(private readonly newsService: NewsService) {
    super();

    this.title='Новости хоккейного мира';
  }

  protected getListData(): Observable<NewsListResponse> {
    return this.newsService.getNewsList(this.listInfo)
  }
}
