export class City {
  id: number;
  name: string = '';
  countryId?: number = 422;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
