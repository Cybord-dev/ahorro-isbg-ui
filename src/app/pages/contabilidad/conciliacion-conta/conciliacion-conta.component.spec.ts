import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliacionContaComponent } from './conciliacion-conta.component';

describe('ConciliacionContaComponent', () => {
  let component: ConciliacionContaComponent;
  let fixture: ComponentFixture<ConciliacionContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConciliacionContaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliacionContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
