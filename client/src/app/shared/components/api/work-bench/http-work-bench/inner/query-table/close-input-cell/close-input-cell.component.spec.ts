import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseInputCellComponent } from './close-input-cell.component';

describe('CloseInputCellComponent', () => {
  let component: CloseInputCellComponent;
  let fixture: ComponentFixture<CloseInputCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseInputCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseInputCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
