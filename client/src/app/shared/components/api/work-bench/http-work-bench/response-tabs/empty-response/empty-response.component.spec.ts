import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyResponseComponent } from './empty-response.component';

describe('EmptyResponseComponent', () => {
  let component: EmptyResponseComponent;
  let fixture: ComponentFixture<EmptyResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
