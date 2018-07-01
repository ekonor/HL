export class SchoolFilter {
    cityId?: number; //  Фильтр - город
    schoolTypeId?: number; // Фильтр - тип школы
    searchText?: string;

    constructor( values: Object = {} )
    {
      Object.assign( this, values );
    }
  }
