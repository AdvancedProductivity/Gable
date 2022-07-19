import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiHeaderOperationComponent } from './api-header-operation.component';

describe('ApiHeaderOperationComponent', () => {
  let component: ApiHeaderOperationComponent;
  let fixture: ComponentFixture<ApiHeaderOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiHeaderOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiHeaderOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
