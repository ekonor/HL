/* Компонент для отображения лого школы со ссылкой на страницу просмотра школы */

import { Component, Input, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiConfig } from 'app/core/api-config';
import { School } from 'app/schools/shared/school';
import { SchoolViewItem } from 'app/schools/shared/school-view-item';
import { SchoolListItem } from 'app/schools/shared/school-list-item';
import { SchoolService } from 'app/schools/shared/school.service';

@Component({
    selector: 'school-pic',
    templateUrl: 'school-pic.component.html'
})

@Injectable()
export class SchoolPicComponent {
    @Input() school: SchoolListItem | SchoolViewItem | School;
    @Input() position: string;

    /* Первый вариант - вертикальный:
    * название школы и под ним лого;
    * второй (position=='horizontal') - горизонтальный:
    * лого и справа от него название школы */

    constructor (
        private readonly router: Router,
        private readonly apiConfig: ApiConfig,
        private readonly schoolService: SchoolService ) {
    }

    public viewSchool(): void {
        this.router.navigate(['school', this.school.id]);
    }

  public getSchoolLogo(): string {
    return this.schoolService.getSchoolLogo(this.school);
  }
}
