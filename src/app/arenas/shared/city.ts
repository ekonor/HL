export class City {
  id: number;
  name: string = '';
  countryId?: number;

  constructor( values: Object = {} )
  {
    Object.assign( this, values );
  }
}
