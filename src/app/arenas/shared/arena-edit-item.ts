import { Coordinates } from 'app/core/geo/coordinates';
import { City } from 'app/core/geo/city';

export class ArenaViewItem {
  name: string;
  linkName?: string;
  address?: string;
  email?: string;
  webSite?: string;
  capacity?: number;
  city?: City = new City;
  contacts?: string;
  coordinates?: Coordinates;
  about?: string;
  arenaTypeId?: number;
  startYear?: number;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }

}
