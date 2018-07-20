export class SchoolFilter {
    cityId: number = null; //  Фильтр - город
    searchText: string = null;

    constructor( values: Object = {} ) {
      Object.assign( this, values );
    }
  }
