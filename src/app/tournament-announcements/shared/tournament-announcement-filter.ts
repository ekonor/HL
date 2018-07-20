import {TournamentAnnouncementFilterState} from 'app/tournament-announcements/shared/tournament-announcement-filter-state';
import {TournamentAnnouncementFilterAge} from 'app/tournament-announcements/shared/tournament-announcement-filter-age';

export class TournamentAnnouncementFilter {
  cityId: number = null; //  Фильтр - город
  startDateFrom: string = null; // Фильтр - Дата проведения от
  startDateTo?: string; // Фильтр - Дата проведения до
  state?: TournamentAnnouncementFilterState = new TournamentAnnouncementFilterState; // Фильтр - статус анонса
  ageGroup?: TournamentAnnouncementFilterAge = new TournamentAnnouncementFilterAge;  // Фильтр - возрастная группа
  gender?: string; // Фильтр - пол участников
  isCommercial?: boolean; // Фильтр - коммерческий (да,нет)
  searchText?: string; // Фильтр - Текст поиска

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
