import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpApiDocComponent } from './http-api-doc.component';

describe('HttpApiDocComponent', () => {
  let component: HttpApiDocComponent;
  let fixture: ComponentFixture<HttpApiDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpApiDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpApiDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
