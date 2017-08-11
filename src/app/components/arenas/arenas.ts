import { ListResponse } from "app/common/list/list-response";

class ArenasItemBase {
  Id: number;
  CategoryId: number;
  Name: string;
  Address: string;
  Email: string;
  WebSite: string;
  Capacity: number;
  Logo: string;
  CityName: string
}

/* класс элемента списка новостей */
export class ArenasListItem extends ArenasItemBase {
}

/* класс списка новостей - то что вернет метод get */
export class ArenasListResponse extends ListResponse<ArenasListItem> {
}

export class ArenasItem extends ArenasItemBase {
  Content: string;
}
