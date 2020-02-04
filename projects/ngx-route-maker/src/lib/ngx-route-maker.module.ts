import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxRouteMakerConfig } from './ngx-route-maker-config.interface';
import { NgxRouteMakerService } from './ngx-route-maker.service';
import { NgxRouteMakerConfigService } from './ngx-route-maker.provider';
import { NgxRouteMakerPipe } from './ngx-route-maker.pipe';

@NgModule({
  declarations: [NgxRouteMakerPipe],
  imports: [],
  exports: [NgxRouteMakerPipe]
})
export class NgxRouteMakerModule {

  static forRoot(config: NgxRouteMakerConfig): ModuleWithProviders {
    return {
      ngModule: NgxRouteMakerModule,
      providers: [
        NgxRouteMakerService,
        {
          provide: NgxRouteMakerConfigService,
          useValue: config
        }
      ]
    };
  }

}
