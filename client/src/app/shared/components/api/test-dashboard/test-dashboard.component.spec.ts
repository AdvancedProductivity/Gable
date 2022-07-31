import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDashboardComponent } from './test-dashboard.component';

describe('TestDashboardComponent', () => {
  let component: TestDashboardComponent;
  let fixture: ComponentFixture<TestDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
