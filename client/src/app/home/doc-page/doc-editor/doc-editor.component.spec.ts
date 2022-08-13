import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocEditorComponent } from './doc-editor.component';

describe('DocEditorComponent', () => {
  let component: DocEditorComponent;
  let fixture: ComponentFixture<DocEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
