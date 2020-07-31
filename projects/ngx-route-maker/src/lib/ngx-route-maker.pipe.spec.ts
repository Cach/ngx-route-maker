import { NgxRouteMakerPipe } from './ngx-route-maker.pipe';
import { NgxRouteMakerService } from './ngx-route-maker.service';
import { TestBed } from '@angular/core/testing';
import { NgxRouteMakerConfigService } from './ngx-route-maker.provider';

describe('NgxRouteMakerPipe', () => {
  let pipe: NgxRouteMakerPipe;

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

    pipe = new NgxRouteMakerPipe(TestBed.get(NgxRouteMakerService));
  });

  it('make route with error', () => {
    expect(() => {
      pipe.transform('fake.path');
    }).toThrowError('Route is not found');
  });

  it('make route with default params', () => {
    expect(pipe.transform('fake.path', {}, '/home')).toBe('/home');
  });

  it('make route with params', () => {
    expect(pipe.transform('pages.second', { id: 'my-route' })).toBe('/pages/second/my-route');
  });

  it('make route', () => {
    expect(pipe.transform('pages.first')).toBe('/pages/first');
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
