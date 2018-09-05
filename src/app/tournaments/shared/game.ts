import { Arena } from 'app/arenas/shared/arena';
import { Team } from 'app/teams/shared/team';
import { Referee } from 'app/referees/shared/referee';


export class Game {
  id: number;
  dt: Date = new Date(); // Дата и время турнира
  team1: Team = null; // Команда 1
  team2: Team = null; // Команда 2
  arena: Arena = null; // Арена
  referees: Array<Referee> = new Array<Referee>(); // Судьи

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
