import { TestBed } from '@angular/core/testing';

import { NgxRouteMakerService } from './ngx-route-maker.service';
import { NgxRouteMakerConfigService } from './ngx-route-maker.provider';

describe('NgxRouteMakerService', () => {
  let service: NgxRouteMakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NgxRouteMakerConfigService,
          useValue: {
            routes: {
              home: '/home',
              pages: {
                _path: 'pages',
                first: 'first',
                second: 'second/{id}'
              }
            }
          }
        }
      ]
    });

    service = TestBed.get(NgxRouteMakerService);
  });

  it('make route with error', () => {
    expect(() => {
      service.make('fake.path');
    }).toThrowError('Route is not found');
  });

  it('make route with default params', () => {
    expect(service.make('fake.path', {}, '/home')).toBe('/home');
  });

  it('make route with params', () => {
    expect(service.make('pages.second', { id: 'my-route' })).toBe('/pages/second/my-route');
  });

  it('make route', () => {
    expect(service.make('pages.first')).toBe('/pages/first');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
