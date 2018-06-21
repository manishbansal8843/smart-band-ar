import { TestBed, inject } from '@angular/core/testing';

import { MiBandService2Service } from './mi-band-service-2.service';

describe('MiBandService2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiBandService2Service]
    });
  });

  it('should be created', inject([MiBandService2Service], (service: MiBandService2Service) => {
    expect(service).toBeTruthy();
  }));
});
