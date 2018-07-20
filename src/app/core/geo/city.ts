import { Country} from 'app/core/geo/country';

export class City {
  id: number = null;
  name: string = '';
  country?: Country = null;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
