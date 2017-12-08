import { ListResponse } from "app/shared/list/list-response";

class NewsItemBase {
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
  /*Creator: {
    UserId: number;
    UserName: string;
    UserLogo: string;
  }*/
  state: number;
}

/* класс элемента списка новостей */
export class NewsListItem extends NewsItemBase {
}

/* класс списка новостей - то что вернет метод get */
export class NewsListResponse extends ListResponse<NewsListItem> {
}

export class NewsItem extends NewsItemBase {
  content: string;
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
