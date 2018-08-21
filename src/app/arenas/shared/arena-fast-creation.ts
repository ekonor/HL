/* Арена для быстрого добавления */

import { City } from 'app/core/geo/city';

export class ArenaFastCreation {
  name: string = null;
  city: City = null;


  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
