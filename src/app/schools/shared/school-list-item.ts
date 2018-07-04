/* Школа в общем списке или select-е */

import { Arena } from 'app/arenas/shared/arena';

export class SchoolListItem {
  id: number;
  name: string;
  fullName?: string;
  linkName: string;
  address?: string;
  email?: string;
  webSite?: string;
  phone?: string;
  logo?: string;
  cityName?: string;
  arena?: Arena;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
