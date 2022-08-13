import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocMenuTreeComponent } from './doc-menu-tree.component';

describe('DocMenuTreeComponent', () => {
  let component: DocMenuTreeComponent;
  let fixture: ComponentFixture<DocMenuTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocMenuTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocMenuTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
