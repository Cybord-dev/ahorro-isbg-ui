import { TestBed } from '@angular/core/testing';

import { DummyTramitesAhorroService } from './dummy-tramites-ahorro.service';

describe('DummyTramitesAhorroService', () => {
  let service: DummyTramitesAhorroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyTramitesAhorroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
