export class Item {
  value: string = null;
  name: string = null;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
