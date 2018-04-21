export class Item {
  value: string;
  name: string;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
