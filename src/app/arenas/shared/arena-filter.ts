export class ArenaFilter {
    cityId: number = null; //  Фильтр - город
    arenaTypeId: number = null; // Фильтр - тип арены
    searchText: string = null;

    constructor( values: Object = {} )
    {
      Object.assign( this, values );
    }
  }
