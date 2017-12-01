import { ListResponse } from "app/shared/list/list-response";

class NewsItemBase {
  Id: number;
  CategoryId: number;
  CategoryName: string;
  LinkName: string;
  Title: string;
  Summary: string;
  ReplyCount: number;
  VoteUpCount: number;
  VoteDownCount: number;
  Logo: string;
  CreationDate: Date;
  /*Creator: {
    UserId: number;
    UserName: string;
    UserLogo: string;
  }*/
  State: number;
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

export class Post {
  id: number;
  categoryId: number;
  categoryName: string;
  linkName: string;
  title: string;
  summary: string;
  replyCount: number;
  voteUpCount: number;
  voteDownCount: number;
  logo: string;
  creationDate: Date;
  /*creator: {
    userId: number;
    userName: string;
    userLogo: string;
  }*/
  state: number;
}
