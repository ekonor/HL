import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import {Post} from "./news";
import {Response} from '@angular/http';


@Injectable()
export class NewsService {

  private patch: string = '/news';


  constructor(private http: Http) {}

    getNewsList() : Observable<Post[]> {
    return this.http.get(this.patch + '/list')
      .map((resp:Response) => {
        let posts :Post[] = [];
        let postList = resp.json().ListItems;
        for(let index in postList){
          console.log(postList[index]);
          let post = (postList[index]);
          posts.push({Title: post.Title, PostUserName: post.PostUserName});
        }
        return posts;
      });

  }
}
