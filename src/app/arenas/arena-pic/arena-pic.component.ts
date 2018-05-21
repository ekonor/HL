/* Компонент для отображения лого арены со ссылкой на страницу просмотра арены */

import { Component, Input, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiConfig } from 'app/core/api-config';
import { Arena } from 'app/arenas/shared/arena';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { ArenaListItem } from 'app/arenas/shared/arena-list-item';
import { ArenaService } from 'app/arenas/shared/arena.service';

@Component({
    selector: "arena-pic",
    templateUrl: "arena-pic.component.html",
    styleUrls: ['arena-pic.component.scss']
})

@Injectable()
export class ArenaPicComponent {
    @Input() arena: ArenaListItem | ArenaViewItem | Arena;
    @Input() position: string;
    /* Первый вариант - вертикальный:
    * название арены и под ним лого;
    * второй (position=='horizontal') - горизонтальный:
    * лого и справа от него название арены */

    constructor (
        private readonly router: Router,
        private readonly apiConfig: ApiConfig,
        private readonly arenaService: ArenaService ) {
    }

    public openProfile(): void {
        this.router.navigate(['arena', this.arena.id]);
    }

  public getArenaLogo(): string {
    return this.arenaService.getArenaLogo(this.arena);
  }
}
