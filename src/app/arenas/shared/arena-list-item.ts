export class ArenaListItem {
  id: number;
  name: string;
  linkName: string;
  address?: string;
  email?: string;
  webSite?: string;
  capacity?: number;
  logo?: string;
  cityName?: string;
  arenaTypeName?: string;

  constructor( values: Object = {} )
  {
    Object.assign( this, values );
  }
}

//https://angular-maps.com
