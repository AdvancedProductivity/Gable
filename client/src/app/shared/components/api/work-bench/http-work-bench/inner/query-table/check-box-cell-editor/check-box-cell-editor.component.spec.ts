import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxCellEditorComponent } from './check-box-cell-editor.component';

describe('CheckBoxCellEditorComponent', () => {
  let component: CheckBoxCellEditorComponent;
  let fixture: ComponentFixture<CheckBoxCellEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckBoxCellEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxCellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
