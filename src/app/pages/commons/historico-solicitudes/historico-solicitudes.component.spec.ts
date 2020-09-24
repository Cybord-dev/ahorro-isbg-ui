import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoSolicitudesComponent } from './historico-solicitudes.component';

describe('HistoricoSolicitudesComponent', () => {
  let component: HistoricoSolicitudesComponent;
  let fixture: ComponentFixture<HistoricoSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoSolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
