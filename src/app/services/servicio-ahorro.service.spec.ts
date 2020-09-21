import { TestBed } from '@angular/core/testing';

import { ServicioAhorroService } from './servicio-ahorro.service';

describe('ServicioAhorroService', () => {
  let service: ServicioAhorroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioAhorroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
