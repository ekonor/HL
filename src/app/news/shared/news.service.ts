import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { NewsItem, NewsListItem } from './news';
import { ListInfo } from 'app/shared/list/list-info';
import { ApiConfig } from 'app/core/api-config';
import { Category } from 'app/news/shared/category';
import { ListResponse } from 'app/shared/list/list-response';
import { Tag } from 'app/news/shared/tag';

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

  public getNewsList(searchText: string, listInfo: ListInfo): Observable<ListResponse<NewsListItem>> {
    let params = listInfo.toParams();

    if (searchText) {
      params = params.append('searchText', searchText);
    }

    return this.httpClient.get<ListResponse<NewsListItem>>(`${this.newsUrl}/list`, { params: params });
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
    if (!post)
      return '';

    let logoSrc = this.apiConfig.filesPath;
    let placeholder = "http://via.placeholder.com/250x150";
    return post.logo ? logoSrc + post.logo : placeholder;
  }

  public getTags(postId: number): Observable<Tag[]> {
    const url = `${this.newsUrl}/tags/${postId}`;
    return this.httpClient.get<Tag[]>(url);
  }
}
