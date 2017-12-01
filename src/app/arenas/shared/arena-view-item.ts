export class ArenaViewItem {
  id: number;
  name: string;
  address?: string;
  email?: string;
  webSite?: string;
  capacity?: number;
  logo?: string;
  cityName?: string;
  contacts?: string;
  longitude?: number;
  latitude?: number;
  about?: string;
  arenaTypeName?: string;

  constructor( values: Object = {} )
  {
    Object.assign( this, values );
  }
}

//https://angular-maps.com
