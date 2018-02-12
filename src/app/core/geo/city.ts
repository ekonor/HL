import { Country} from 'app/core/geo/country';

export class City {
  id: number;
  name: string = '';
  country?: Country;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
