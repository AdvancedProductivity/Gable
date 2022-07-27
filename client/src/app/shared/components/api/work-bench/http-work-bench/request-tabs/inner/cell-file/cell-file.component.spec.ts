import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellFileComponent } from './cell-file.component';

describe('CellFileComponent', () => {
  let component: CellFileComponent;
  let fixture: ComponentFixture<CellFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
