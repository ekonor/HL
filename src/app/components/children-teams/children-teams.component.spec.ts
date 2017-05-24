import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenTeamsComponent } from './children-teams.component';

describe('ChildrenTeamsComponent', () => {
  let component: ChildrenTeamsComponent;
  let fixture: ComponentFixture<ChildrenTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
