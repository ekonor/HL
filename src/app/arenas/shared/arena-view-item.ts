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
  city?: City = new City;
  contacts?: string;
  coordinates?: Coordinates = new Coordinates;
  about?: string;
  arenaTypeId?: number;
  fullName?: string;
  startYear: number;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
