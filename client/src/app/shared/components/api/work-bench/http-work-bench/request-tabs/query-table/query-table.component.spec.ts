import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryTableComponent } from './query-table.component';

describe('QueryTableComponent', () => {
  let component: QueryTableComponent;
  let fixture: ComponentFixture<QueryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
