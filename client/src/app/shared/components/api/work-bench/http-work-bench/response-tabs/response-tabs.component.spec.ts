import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseTabsComponent } from './response-tabs.component';

describe('ResponseTabsComponent', () => {
  let component: ResponseTabsComponent;
  let fixture: ComponentFixture<ResponseTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
