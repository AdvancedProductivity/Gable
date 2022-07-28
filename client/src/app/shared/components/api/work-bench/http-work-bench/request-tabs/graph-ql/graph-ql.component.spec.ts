import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphQLComponent } from './graph-ql.component';

describe('GraphQLComponent', () => {
  let component: GraphQLComponent;
  let fixture: ComponentFixture<GraphQLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphQLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphQLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
