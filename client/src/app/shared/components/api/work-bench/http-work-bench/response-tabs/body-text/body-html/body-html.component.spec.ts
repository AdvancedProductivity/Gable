import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyHtmlComponent } from './body-html.component';

describe('BodyHtmlComponent', () => {
  let component: BodyHtmlComponent;
  let fixture: ComponentFixture<BodyHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyHtmlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
