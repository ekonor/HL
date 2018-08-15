import { Player } from 'app/teams/shared/player';
import { City } from 'app/core/geo/city';

export class Team {
  id: number;
  name: string;
  fullName?: string;
  cityName?: string;
  regionName?: string;
  countyName?: string;
  countryName?: string;
  city: City = null; // Город
  gender: string;
  teamGroup: string;
  ageGroup?: string;
  logo?: string;
  players: Array<Player> = new Array<Player>(); // Игроки

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
