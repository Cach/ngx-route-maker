import { Inject, Injectable } from '@angular/core';
import { NgxRouteMakerConfigService } from './ngx-route-maker.provider';
import { NgxRouteMakerConfig } from './ngx-route-maker-config.interface';
import { NgxRouteMaker } from './ngx-route-maker.interface';

@Injectable({
  providedIn: 'root'
})
export class NgxRouteMakerService {

  private readonly routes: NgxRouteMaker;

  constructor(
    @Inject(NgxRouteMakerConfigService) private config: NgxRouteMakerConfig
  ) {
    this.routes = config.routes;
  }

  /**
   * Get route by name with parameters
   */
  public makeRouteByName(name: string|string[], params: any = {}) {
    const route = this._getPath(name);

    if (!route) {
      throw new Error('Route is not found');
    }

    return this._replaceVariables(route, params);
  }

  /**
   * Get route path by name
   */
  private _getPath(name: string|string[]): string {
    try {
      if (typeof name === 'string') {
        return name.split('.').reduce((o, i) => o[i], this.routes);
      }

      if (name instanceof Array) {
        return name.reduce((o, i) => o[i], this.routes);
      }
    } catch {
      throw new Error('Route is not found');
    }

    return null;
  }

  /**
   * Replacing route variables to real data
   */
  private _replaceVariables(route: string, params: any = {}) {
    return route.replace(/{\w+}/gm, (variable) => {
      const name = this._getVariableName(variable);

      if (params.hasOwnProperty(name)) {
        return params[name];
      }

      return variable;
    });
  }

  /**
   * Get variable name
   */
  private _getVariableName(variable: string): string {
    return variable.replace(/[{}]+/g, '');
  }

}
