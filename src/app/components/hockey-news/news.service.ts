import { Injectable } from '@angular/core';
import { NEWS } from "./mock-news";

@Injectable()
export class NewsService {

  getNews() {

    return Promise.resolve(NEWS);
  }

  constructor() { }

}
