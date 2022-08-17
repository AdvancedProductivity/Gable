import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpUrlDocComponent } from './http-url-doc.component';

describe('HttpUrlDocComponent', () => {
  let component: HttpUrlDocComponent;
  let fixture: ComponentFixture<HttpUrlDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpUrlDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpUrlDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
