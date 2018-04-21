export class ListResponse<TListItem> {
  listItems: Array<TListItem>;
  count: number;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}

