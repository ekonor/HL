export class TournamentAnnouncementFilter {
  cityId?: number; //  Фильтр - город
  startDateFrom?: string; // Фильтр - Дата проведения от
  startDateTo?: string; // Фильтр - Дата проведения до
  state?: string; // Фильтр - статус анонса
  ageGroup?: string; // Фильтр - возрастная группа
  gender?: string; // Фильтр - пол участников
  isCommercial?: boolean; // Фильтр - коммерческий (да,нет)
  searchText?: string; // Фильтр - Текст поиска

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
