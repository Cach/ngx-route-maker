export interface NgxRouteMaker {
  _path?: string;
  [key: string]: NgxRouteMaker|string;
}
