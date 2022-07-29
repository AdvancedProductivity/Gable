import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseCookiesComponent } from './response-cookies.component';

describe('ResponseCookiesComponent', () => {
  let component: ResponseCookiesComponent;
  let fixture: ComponentFixture<ResponseCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseCookiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
