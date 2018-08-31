/* Судья для быстрого добавления */

import { City } from 'app/core/geo/city';

export class RefereeFastCreation {
  name: string = null;
  fullName: string = null;
  city: City = null;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
