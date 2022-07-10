import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTreeMenuComponent } from './api-tree-menu.component';

describe('ApiTreeMenuComponent', () => {
  let component: ApiTreeMenuComponent;
  let fixture: ComponentFixture<ApiTreeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiTreeMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiTreeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
