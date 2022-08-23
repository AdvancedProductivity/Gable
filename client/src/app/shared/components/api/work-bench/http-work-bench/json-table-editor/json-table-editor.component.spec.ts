import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonTableEditorComponent } from './json-table-editor.component';

describe('JsonTableEditorComponent', () => {
  let component: JsonTableEditorComponent;
  let fixture: ComponentFixture<JsonTableEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonTableEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonTableEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
