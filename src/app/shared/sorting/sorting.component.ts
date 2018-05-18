import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { SortDir } from 'app/shared/list/list-info';
import { SortOption } from 'app/shared/sorting/sort-option';

@Component({
  selector: 'sorting',
  templateUrl: './sorting.component.html'
})
export class SortingComponent {

  @Input() options: SortOption[];
  @Input() orderBy?: string;
  @Input() orderDir?: SortDir;

  @Output() onSorted = new EventEmitter<{}>();

  constructor() {
  }

  ngOnInit() {
      if (this.orderBy) {
        if (this.options.filter((item) => item.value === this.orderBy).length === 0) {
            this.orderBy = null;
        }
      }

      if(!this.orderBy)
      {
          this.orderDir = null;
      }
  }

  isSelectedOption(option: string): boolean {
    return this.orderBy === option;
  }

  isSortAsc(option: string): boolean {
    return this.isSelectedOption(option) && this.orderDir === SortDir.Asc;
  }

  isSortDesc(option: string): boolean {
    return this.isSelectedOption(option) && this.orderDir === SortDir.Desc;
  }

  setSort(option: string): void {
    if (option === this.orderBy) {
        this.orderDir = ( ( this.orderDir === SortDir.Asc ) ? SortDir.Desc : SortDir.Asc );
    } else {
        this.orderBy = option;
        this.orderDir = SortDir.Asc;
    }
    this.onSorted.emit({ orderBy: this.orderBy, orderDir: this.orderDir});
  }
}
