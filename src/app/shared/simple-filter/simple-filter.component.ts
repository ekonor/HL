import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';

@Component({
  selector: 'simple-filter',
  templateUrl: './simple-filter.component.html'
})
export class SimpleFilterComponent {
  @Output() onFiltered = new EventEmitter<string>();

  searchText: string;

  constructor(
    private router: Router) {
  }

  ngOnInit() {
  }

  onFilter() {
    if (this.searchText && this.searchText.length > 0)
      this.onFiltered.emit(this.searchText);
  }
}
