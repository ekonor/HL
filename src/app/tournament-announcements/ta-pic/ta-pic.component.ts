/* Компонент для отображения лого анонса турнира
* со ссылкой на страницу просмотра отдельного анонса */

import { Component, Input, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiConfig } from 'app/core/api-config';
import { TournamentAnnouncementListItem } from 'app/tournament-announcements/shared/tournament-announcement-list-item';
import { TournamentAnnouncementViewItem } from 'app/tournament-announcements/shared/tournament-announcement-view-item';
// import { TournamentAnnouncement } from 'app/tournament-announcements/shared/tournament-announcement';
import { TournamentAnnouncementsService } from 'app/tournament-announcements/shared/tournament-announcements.service';


@Component({
    selector: 'ta-pic',
    templateUrl: 'ta-pic.component.html'
})

@Injectable()
export class TAPicComponent {
    @Input() ta: TournamentAnnouncementListItem | TournamentAnnouncementViewItem;
    @Input() position: string;
    /* Первый вариант - вертикальный:
    * название анонса и под ним лого;
    * второй (position=='horizontal') - горизонтальный:
    * лого и справа от него название анонса */

    constructor (
        private readonly router: Router,
        private readonly apiConfig: ApiConfig,
        private readonly taService: TournamentAnnouncementsService ) {
    }

    public viewTA(): void {
        this.router.navigate(['tournament-announcement', this.ta.id]);
    }

  public getTournamentAnnouncementLogo(): string {
    return this.taService.getTournamentAnnouncementLogo(this.ta);
  }
}
