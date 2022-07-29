import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseHeadersComponent } from './response-headers.component';

describe('ResponseHeadersComponent', () => {
  let component: ResponseHeadersComponent;
  let fixture: ComponentFixture<ResponseHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseHeadersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
