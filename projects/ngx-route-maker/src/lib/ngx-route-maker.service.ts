import { Inject, Injectable } from '@angular/core';
import { NgxRouteMakerConfigService } from './ngx-route-maker.provider';
import { NgxRouteMakerConfig } from './ngx-route-maker-config.interface';
import { NgxRouteMaker } from './ngx-route-maker.interface';

@Injectable({
  providedIn: 'root'
})
export class NgxRouteMakerService {

  private readonly routes: NgxRouteMaker;

  private route: string[] = [];

  constructor(
    @Inject(NgxRouteMakerConfigService) private config: NgxRouteMakerConfig
  ) {
    this.routes = config.routes;
  }

  /**
   * Get route by name with parameters
   *
   * @param name - route name
   * @param params - route binding variables
   * @param defaultRoute - default route for empty result
   *
   * @deprecated since version 1.1. Use make instead
   */
  public makeRouteByName(name: string|string[], params: any = {}, defaultRoute?: string): string {
    return this.make(name, params, defaultRoute);
  }

  /**
   * Get route by name with parameters
   *
   * @param name - route name
   * @param params - route binding variables
   * @param defaultRoute - default route for empty result
   */
  public make(name: string|string[], params: any = {}, defaultRoute?: string): string {
    this._clearRoute();

    const route: string = this._getRoute(name);

    if (!route) {
      if (defaultRoute) {
        return defaultRoute;
      }

      throw new Error('Route is not found');
    }

    return this._replaceVariables(route, params);
  }

  /**
   * Fill route
   *
   * @param name - route name
   *
   */
  private _getRoute(name: string|string[]): string {
    this._fillRoute(name);

    if (!this.route.length) {
      return null;
    }

    const route: string = this.route
      .filter(Boolean)
      .map((item) => {
        if (item.startsWith('/')) {
          return item.substring(1);
        }

        return item;
      })
      .join('/');

    return `/${ route }`;
  }

  /**
   * Fill route
   *
   * @param name - route name
   */
  private _fillRoute(name: string|string[]): void {
    const formatted: string[] = typeof name === 'string' ? name.split('.') : name;
    let routes = Object.assign({}, this.routes);

    try {
      formatted.forEach((key: string) => {
        if (!routes.hasOwnProperty(key)) {
          return;
        }

        if (routes.hasOwnProperty('_path')) {
          this.route.push(routes._path);
        }

        const current: any = routes[key];

        if (typeof current === 'string') {
          this.route.push(current);

          return;
        }

        routes = current;
      });
    } catch {
      throw new Error('Route is not found');
    }
  }

  /**
   * Replacing route variables to real data
   */
  private _replaceVariables(route: string, params: any = {}): string {
    return route.replace(/{\w+}/gm, (variable) => {
      const name: string = this._getVariableName(variable);

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

  /**
   * Clear route
   */
  private _clearRoute(): void {
    this.route = [];
  }

}
