export class TournamentAnnouncementFilterState {
  isDraft: boolean = false;
  isRegistration: boolean = false;
  isWait: boolean = false;
  isReject: boolean = false;
  isFinished: boolean = false;
  isCanceled: boolean = false;
  isDeleted: boolean = false;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
