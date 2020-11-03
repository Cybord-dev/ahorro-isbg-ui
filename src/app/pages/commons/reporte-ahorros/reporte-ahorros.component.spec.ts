import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAhorrosComponent } from './reporte-ahorros.component';

describe('ReporteAhorrosComponent', () => {
  let component: ReporteAhorrosComponent;
  let fixture: ComponentFixture<ReporteAhorrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteAhorrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAhorrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
