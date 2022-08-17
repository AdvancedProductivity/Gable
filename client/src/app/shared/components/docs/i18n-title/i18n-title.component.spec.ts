import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nTitleComponent } from './i18n-title.component';

describe('I18nTitleComponent', () => {
  let component: I18nTitleComponent;
  let fixture: ComponentFixture<I18nTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I18nTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I18nTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
