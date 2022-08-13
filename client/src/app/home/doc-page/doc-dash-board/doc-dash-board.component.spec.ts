import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDashBoardComponent } from './doc-dash-board.component';

describe('DocDashBoardComponent', () => {
  let component: DocDashBoardComponent;
  let fixture: ComponentFixture<DocDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocDashBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
