import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpWorkBenchComponent } from './http-work-bench.component';

describe('HttpWorkBenchComponent', () => {
  let component: HttpWorkBenchComponent;
  let fixture: ComponentFixture<HttpWorkBenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpWorkBenchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpWorkBenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
