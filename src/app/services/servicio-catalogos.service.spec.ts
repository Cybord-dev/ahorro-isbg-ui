import { TestBed } from '@angular/core/testing';

import { ServicioCatalogosService } from './servicio-catalogos.service';

describe('ServicioCatalogosService', () => {
  let service: ServicioCatalogosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioCatalogosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
