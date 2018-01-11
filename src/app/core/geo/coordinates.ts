export class Coordinates {
  longitude?: number;
  latitude?: number;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
