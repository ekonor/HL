import { Coordinates } from 'app/core/geo/coordinates';
import { City } from 'app/core/geo/city';

export class ArenaViewItem {
  id: number;
  name: string;
  linkName?: string;
  address?: string;
  email?: string;
  webSite?: string;
  capacity?: number;
  logo?: string;
  // cityName?: string;
  city?: City;
  contacts?: string;
  coordinates?: Coordinates = new Coordinates;
  about?: string;
  // arenaTypeName?: string;
  arenaTypeId?: number;
  fullName?: string;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
