import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocCreateDialogComponent } from './doc-create-dialog.component';

describe('DocCreateDialogComponent', () => {
  let component: DocCreateDialogComponent;
  let fixture: ComponentFixture<DocCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
