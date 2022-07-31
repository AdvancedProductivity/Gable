import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionWorkBenchComponent } from './collection-work-bench.component';

describe('CollectionWorkBenchComponent', () => {
  let component: CollectionWorkBenchComponent;
  let fixture: ComponentFixture<CollectionWorkBenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionWorkBenchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionWorkBenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
