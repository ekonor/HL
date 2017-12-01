export class ArenaFilter {
    cityId?: number; //  Фильтр - город
    arenaTypeId?: number; // Фильтр - тип арены
    searchText? : string;
  
    constructor( values: Object = {} )
    {
      Object.assign( this, values );
    }
  }