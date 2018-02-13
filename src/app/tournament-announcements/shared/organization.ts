export class Organization {
  id: number;
  name: string;
  linkName?: string;
  logo?: string;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
