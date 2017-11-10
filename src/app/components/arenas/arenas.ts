export class Arena {
  linkName: string = '';
  id: number;
  name: string = '';
  address: string = '';
  email: string = '';
  webSite: string = '';
  capacity: number = 0;
  logo: string = '';
  cityName: string = '';
  contacts: string;
  longitude: number = 0;
  latitude: number = 0;
  about: string = '';
  arenaTypeName: string = '';

  constructor( values: Object = {} )
  {
    Object.assign( this, values );
  }
}
