export class SchoolFilter {
    cityId?: number; //  Фильтр - город
    searchText?: string;

    constructor( values: Object = {} ) {
      Object.assign( this, values );
    }
  }
