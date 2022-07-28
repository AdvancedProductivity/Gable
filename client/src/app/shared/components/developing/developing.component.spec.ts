import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopingComponent } from './developing.component';

describe('DevelopingComponent', () => {
  let component: DevelopingComponent;
  let fixture: ComponentFixture<DevelopingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
