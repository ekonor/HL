export class Team {
  id: number;
  name: string;
  linkName?: string;
  logo?: string;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
