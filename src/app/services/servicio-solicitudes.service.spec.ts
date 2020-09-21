import { TestBed } from '@angular/core/testing';

import { ServicioSolicitudesService } from './servicio-solicitudes.service';

describe('ServicioSolicitudesService', () => {
  let service: ServicioSolicitudesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioSolicitudesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
