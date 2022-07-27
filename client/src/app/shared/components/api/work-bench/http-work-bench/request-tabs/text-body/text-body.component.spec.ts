import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBodyComponent } from './text-body.component';

describe('TextBodyComponent', () => {
  let component: TextBodyComponent;
  let fixture: ComponentFixture<TextBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
