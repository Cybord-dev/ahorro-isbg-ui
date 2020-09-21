import { TestBed } from '@angular/core/testing';

import { ServicioPrestamosService } from './servicio-prestamos.service';

describe('ServicioPrestamosService', () => {
  let service: ServicioPrestamosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioPrestamosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
