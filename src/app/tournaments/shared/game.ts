import { Arena } from 'app/arenas/shared/arena';
import { Team } from 'app/teams/shared/team';
import { Referee } from 'app/referees/shared/referee';
import { CustomTime } from 'app/tournaments/shared/customtime';


export class Game {
  id: number;
  date: Date; // Дата турнира
  time: CustomTime; // Время турнира
  team1: Team = null; // Команда 1
  team2: Team = null; // Команда 2
  arena: Arena = null; // Арена
  referees: Array<Referee> = new Array<Referee>(); // Судьи
  prevGameId: number = null; // Предыдущая игра - для плей-офф

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
