import { Injectable } from '@angular/core';
import { Http, RequestOptions }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { NewsListResponse, NewsItem } from './news';
import { ListInfo } from 'app/common/list/list-info';

@Injectable()
export class NewsService {
  private newsUrl : string = `http://87.117.9.216/Hockeyapp.WebApi/api/v1/news`;
  private options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
  
  constructor(private http: Http) {}

  getNewsList(listInfo: ListInfo): Promise<NewsListResponse> {   
    let params: URLSearchParams = new URLSearchParams();
    for(let key in listInfo){
      params.set(key.toString(), listInfo[key]);
    }
    
    this.options.search = params;
    
    return this.http
    .get(`${this.newsUrl}/list`, this.options)
    .map(response => response.json().data as NewsListResponse);  
  }

  getNewsItem(id: number): Promise<NewsItem> {
      const url = `${this.newsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as NewsItem)
            .catch(this.handleError);
          }


  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
