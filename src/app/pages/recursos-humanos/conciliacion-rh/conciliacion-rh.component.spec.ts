import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliacionRhComponent } from './conciliacion-rh.component';

describe('ConciliacionRhComponent', () => {
  let component: ConciliacionRhComponent;
  let fixture: ComponentFixture<ConciliacionRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConciliacionRhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliacionRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
