import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPageComponent } from './mock-page.component';

describe('MockPageComponent', () => {
  let component: MockPageComponent;
  let fixture: ComponentFixture<MockPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
