import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoneBodyComponent } from './none-body.component';

describe('NoneBodyComponent', () => {
  let component: NoneBodyComponent;
  let fixture: ComponentFixture<NoneBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoneBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoneBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
