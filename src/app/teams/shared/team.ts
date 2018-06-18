export class Team {
  id: number;
  name: string;
  fullName: string;
  cityName: string; // NEED FIX -> City
  gender: string;
  teamGroup: string;
  ageGroup: string;
  logo?: string;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
