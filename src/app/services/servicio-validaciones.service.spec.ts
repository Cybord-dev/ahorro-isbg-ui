import { TestBed } from '@angular/core/testing';

import { ServicioValidacionesService } from './servicio-validaciones.service';

describe('ServicioValidacionesService', () => {
  let service: ServicioValidacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioValidacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
