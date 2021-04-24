import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliacionPrestamosComponent } from './conciliacion-prestamos.component';

describe('ConciliacionPrestamosComponent', () => {
  let component: ConciliacionPrestamosComponent;
  let fixture: ComponentFixture<ConciliacionPrestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConciliacionPrestamosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliacionPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
