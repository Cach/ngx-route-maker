import { TestBed } from '@angular/core/testing';

import { NgxRouteMakerService } from './ngx-route-maker.service';

describe('NgxRouteMakerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxRouteMakerService = TestBed.get(NgxRouteMakerService);
    expect(service).toBeTruthy();
  });
});
