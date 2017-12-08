import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { NewsListResponse, NewsItem, NewsListItem } from './news';
import { ListInfo } from 'app/shared/list/list-info';
import { ApiConfig } from 'app/core/api-config';
import { Category } from 'app/news/shared/category';

@Injectable()
export class NewsService {
  private newsUrl: string;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly apiConfig: ApiConfig) {
    this.newsUrl = `${this.apiConfig.apiPath}/news`;
  }

  public getNewsCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.newsUrl}/category/list`);
  }

  public getNewsList(listInfo: ListInfo): Observable<NewsListResponse> {
    let params = listInfo.toParams();
    return this.httpClient.get<NewsListResponse>(`${this.newsUrl}/list`, { params: params });
  }

  public getResentNewsList(): Observable<NewsListItem[]> {
    return this.httpClient.get<NewsListItem[]>(`${this.newsUrl}/resent`);
  }

  public getImportantNewsList(): Observable<NewsListItem[]> {
    return this.httpClient.get<NewsListItem[]>(`${this.newsUrl}/important`);
  }

  public getNewsItem(id: number): Observable<NewsItem> {
    const url = `${this.newsUrl}/${id}`;
    return this.httpClient.get<NewsItem>(url);
  }

  public getNewsLogo(post: any): string {
    let logoSrc = this.apiConfig.filesPath;
    let placeholder = "http://via.placeholder.com/250x150";
    return post.logo ? logoSrc + post.logo : placeholder;
  }
}
