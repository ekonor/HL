export class CustomTime {
  hour: number;
  minute: number;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
