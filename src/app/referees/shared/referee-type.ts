export class RefereeType {
  id: number;
  name: string;
  description: string;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
