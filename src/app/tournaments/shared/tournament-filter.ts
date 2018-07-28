/*import {TournamentAnnouncementFilterState} from 'app/tournament-announcements/shared/tournament-announcement-filter-state';
import {TournamentAnnouncementFilterAge} from 'app/tournament-announcements/shared/tournament-announcement-filter-age';
*/

export class TournamentFilter {
  cityId: number = null; //  Фильтр - город
  /*startDateFrom: string = null; // Фильтр - Дата проведения от
  startDateTo?: string = null; // Фильтр - Дата проведения до
  state: TournamentAnnouncementFilterState = new TournamentAnnouncementFilterState; // Фильтр - статус анонса
  ageGroup: TournamentAnnouncementFilterAge = new TournamentAnnouncementFilterAge;  // Фильтр - возрастная группа
  gender: string = null; // Фильтр - пол участников
  isCommercial: boolean = null; // Фильтр - коммерческий (да,нет)*/
  searchText: string = null; // Фильтр - Текст поиска*/

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
