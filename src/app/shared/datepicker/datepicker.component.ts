import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Component, Injectable, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<Date> {

  fromModel(date: Date): NgbDateStruct {
    return (date && date.getFullYear) ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} : null;
  }

  toModel(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }
}

@Component({
  selector: 'app-datepicker',
  templateUrl: 'datepicker.component.html'

  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will want to provide your main App Module
  // providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class DatepickerComponent implements OnInit {
  @Input() dt: Date;
  @Output() onChanged = new EventEmitter<Date>();
  dtModel: NgbDateStruct;

  ngOnInit() {
    this.dtModel = (this.dt && this.dt.getFullYear) ? {year: this.dt.getFullYear(), month: this.dt.getMonth() + 1, day: this.dt.getDate()} : null;
  }

  /* get today() {
    return new Date();
  } */

  pickDt() {
    //console.log(this.dtModel);
    this.dt = this.dtModel ? new Date(this.dtModel.year, this.dtModel.month - 1, this.dtModel.day) : null;
    //console.log(this.dt);
    this.onChanged.emit(this.dt);
  }
}
