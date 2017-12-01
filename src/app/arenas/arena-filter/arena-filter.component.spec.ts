import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaFilterComponent } from './arena-filter.component';

describe('ArenasComponent', () => {
  let component: ArenaFilterComponent;
  let fixture: ComponentFixture<ArenaFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArenaFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
