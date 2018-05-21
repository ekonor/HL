/* Компонент для отображения лого организации
* со ссылкой на страницу просмотра организации */

import { Component, Input, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiConfig } from 'app/core/api-config';
import { Organization } from 'app/organizations/shared/organization';
import { OrganizationService } from 'app/organizations/shared/organization.service';

@Component({
    selector: 'organization-pic',
    templateUrl: 'organization-pic.component.html'
})

@Injectable()
export class OrganizationPicComponent {
    @Input() org: Organization;
    @Input() position: string;
    /* Первый вариант - вертикальный:
    * название организации и под ним лого;
    * второй (position=='horizontal') - горизонтальный:
    * лого и справа от него название организации */

    constructor (
        private readonly router: Router,
        private readonly apiConfig: ApiConfig,
        private readonly orgService: OrganizationService ) {
    }

    public viewOrganization(): void {
        this.router.navigate(['organization', this.org.id]);
    }

  public getOrganizationLogo(): string {
    return this.orgService.getOrganizationLogo(this.org);
  }
}
