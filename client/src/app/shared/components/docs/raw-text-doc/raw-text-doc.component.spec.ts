import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawTextDocComponent } from './raw-text-doc.component';

describe('RawTextDocComponent', () => {
  let component: RawTextDocComponent;
  let fixture: ComponentFixture<RawTextDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawTextDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RawTextDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
