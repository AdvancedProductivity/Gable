import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTreeComponent } from './empty-tree.component';

describe('EmptyTreeComponent', () => {
  let component: EmptyTreeComponent;
  let fixture: ComponentFixture<EmptyTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
