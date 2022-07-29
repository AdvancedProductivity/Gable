import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseKeyValueComponent } from './response-key-value.component';

describe('ResponseKeyValueComponent', () => {
  let component: ResponseKeyValueComponent;
  let fixture: ComponentFixture<ResponseKeyValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseKeyValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseKeyValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
