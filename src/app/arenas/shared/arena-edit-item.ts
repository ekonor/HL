export class ArenaViewItem {
  name: string;
  linkName?: string;
  address?: string;
  email?: string;
  webSite?: string;
  capacity?: number;
  //logo?: string;
  cityId?: number;
  contacts?: string;
  longitude?: number;
  latitude?: number;
  about?: string;
  arenaTypeId?: string;
  startYear?: number;

  constructor( values: Object = {} )
  {
    Object.assign( this, values );
  }
}

//https://angular-maps.com
