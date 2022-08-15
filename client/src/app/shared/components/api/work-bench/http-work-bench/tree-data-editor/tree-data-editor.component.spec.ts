import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeDataEditorComponent } from './tree-data-editor.component';

describe('TreeDataEditorComponent', () => {
  let component: TreeDataEditorComponent;
  let fixture: ComponentFixture<TreeDataEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeDataEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeDataEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
