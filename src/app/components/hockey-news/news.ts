import { ListResponse } from "app/common/list/list-response";

class NewsItemBase {
  Id: number; 
  CategoryId: number;   
  CategotyName: string;
  Title: string; 
  Summary: string;  
  Added: Date; 
  PostUserId: number; 
  PostUserName: string; 
  ReplyCount: number;  
  VoteUpCount: number;   
  VoteDownCount: number; 
  SourceUrl: string;
  SourceName: string; 
  Logo: string;
  LogoSource: string;
}

/* класс элемента списка новостей */
export class NewsListItem extends NewsItemBase {      
}

/* класс списка новостей - то что вернет метод get */
export class NewsListResponse extends ListResponse<NewsListItem> {
}

export class NewsItem extends NewsItemBase {
  Content: string;
}

// export class Post {
//   id: number;
//   title: string;
//   date: string;
//   time: string;
//   autor: string;
//   description: string;
//   text: string;
//   video: string;
//   image: string;
//   sitename: string;
//   sitelink: string;
// }
