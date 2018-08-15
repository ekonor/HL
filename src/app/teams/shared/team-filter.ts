export class TeamFilter {
    cityId: number = null; //  Фильтр - город
    // arenaTypeId: number = null; // Фильтр - тип команды
    searchText: string = null;

    constructor( values: Object = {} )
    {
      Object.assign( this, values );
    }
  }
