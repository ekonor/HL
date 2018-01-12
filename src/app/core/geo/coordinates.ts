export class Coordinates {
  longitude?: number = 0;
  latitude?: number = 0;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
