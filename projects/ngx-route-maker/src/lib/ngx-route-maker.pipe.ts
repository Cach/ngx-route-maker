import { Pipe, PipeTransform } from '@angular/core';
import { NgxRouteMakerService } from './ngx-route-maker.service';

@Pipe({
  name: 'makeRoute'
})
export class NgxRouteMakerPipe implements PipeTransform {

  constructor(
    private ngxRouteMakerService: NgxRouteMakerService
  ) {
  }

  public transform(name: string, params: any = {}, defaultRoute?: string): string {
    return this.ngxRouteMakerService.make(name, params, defaultRoute);
  }

}
