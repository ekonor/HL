import { ListResponse } from "app/shared/list/list-response";
import { UserInfo } from "app/shared/user-info";

/* класс элемента списка новостей */
export class NewsListItem {
  id: number;
  creator : UserInfo;
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
  state: number;
}

export class NewsItem {
  id: number;
  creator : UserInfo;
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
  state: number;
  content: string;
}
