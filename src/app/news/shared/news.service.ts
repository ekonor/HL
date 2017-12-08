import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { NewsListResponse, NewsItem } from './news';
import { ListInfo } from 'app/shared/list/list-info';
import { ApiConfig } from 'app/core/api-config';

@Injectable()
export class NewsService {
  private newsUrl : string;

  constructor(
    private readonly http: Http, 
    private readonly apiConfig: ApiConfig) {
      this.newsUrl = `${this.apiConfig.apiPath}/news`;
  }

  public getNewsList(listInfo: ListInfo): Observable<NewsListResponse> {
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");

    let params = new URLSearchParams();
    for(let key in listInfo){
      params.append(key.toString(), listInfo[key]);
    }

    let requestOptions =  new RequestOptions({ headers: headers, params: params } as any);

    return this.http.get(`${this.newsUrl}/list`, requestOptions)
      .map(response => response.json() as NewsListResponse);

  }

  public getNewsItem(id: number): Promise<NewsItem> {
    const url = `${this.newsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as NewsItem)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
