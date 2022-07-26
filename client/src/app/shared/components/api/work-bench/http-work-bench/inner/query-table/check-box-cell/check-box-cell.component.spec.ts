import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxCellComponent } from './check-box-cell.component';

describe('CheckBoxCellComponent', () => {
  let component: CheckBoxCellComponent;
  let fixture: ComponentFixture<CheckBoxCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckBoxCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
