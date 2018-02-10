export class Country {
  id: number = 422;
  name: string = 'Россия';

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
