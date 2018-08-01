import { Arena } from 'app/arenas/shared/arena';
import { Organization } from 'app/organizations/shared/organization';
import { City } from 'app/core/geo/city';
import { Team } from 'app/teams/shared/team';

export class Tournament {
  id: number;
  name: string; // Название турнира
  startDate?: Date; // Дата начала турнира
  endDate?: Date; // Дата окончания турнира
  ageGroup?: string; // Возрастная группа/год рождения
  division: string = null; // Дивизион/группы/этапы;
  requiredResponseCount?: number; // Кол-во участников
  city: City = null; // Город проведения
  arena: Arena = null; // Арена
  logo?: string;

  teams?: Team[];
  //minAge?: number; // Если Возрастная группа дети или подростки, то можно указать еще год рождения участников от – до
  //maxAge?: number;
  /*
  organization?: Organization; // Организатор турнира
  arena?: Arena; // Арена
  isCommercial: boolean = true; // Признак коммерческий или нет (IsCommercial) – иконка
  cost?: number; // Если коммерческий, указать цену участия (Cost)
  costType?: string; // Тип оплаты (CostType) - c человека или с команды
  gender?: string = 'Male'; // Пол участников (Gender) – иконкой*/

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
