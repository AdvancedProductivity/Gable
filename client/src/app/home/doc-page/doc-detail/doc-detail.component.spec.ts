import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDetailComponent } from './doc-detail.component';

describe('DocDetailComponent', () => {
  let component: DocDetailComponent;
  let fixture: ComponentFixture<DocDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
