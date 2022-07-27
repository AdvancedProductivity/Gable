import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellFileTextComponent } from './cell-file-text.component';

describe('CellFileTextComponent', () => {
  let component: CellFileTextComponent;
  let fixture: ComponentFixture<CellFileTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellFileTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellFileTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
