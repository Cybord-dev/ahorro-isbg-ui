import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAhorroComponent } from './reporte-ahorro.component';

describe('ReporteAhorroComponent', () => {
  let component: ReporteAhorroComponent;
  let fixture: ComponentFixture<ReporteAhorroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteAhorroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAhorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
