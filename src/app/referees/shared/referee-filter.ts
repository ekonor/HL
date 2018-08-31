export class RefereeFilter {
  cityId: number = null; //  Фильтр - город
  refereeTypeId: string = null; // Фильтр - тип судьи
  searchText: string = null; // Фильтр - Текст поиска

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
