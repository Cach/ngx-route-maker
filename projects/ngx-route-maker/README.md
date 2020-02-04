# NgxRouteMaker

This library for generating routes

## Install

```bash
$ npm install ngx-route-maker --save
```

Add package to NgModule imports:

```typescript
import { NgxRouteMakerModule } from 'ngx-route-maker';

const routes = {
  home: '/',
  dashboard: '/dashboard',
  pages: {
    page: '/pages/{slug}'
  }
};

@NgModule({
  ...
  NgxRouteMakerModule.forRoot(routes)
  ...
})
```

## Generate

 - From string: `/pages/new-page`
 
```typescript
this.routeMaker.makeRouteByName('pages.page', { slug: 'new-page' });
```

 - From array: `/pages/new-page`
 
```typescript
this.routeMaker.makeRouteByName(['pages', 'page'], { slug: 'new-page' });
```

## Usage

 - Usage with service:

```typescript
import { NgxRouteMakerService } from 'ngx-route-maker';

export class DashboardComponent {

  constructor(
    private routeMaker: NgxRouteMakerService
  ) {
  }

  public getUrlByString(): string {
    return this.routeMaker.makeRouteByName('pages.page', { slug: 'new-page' });
  }

  public getUrlByArray(): string {
    return this.routeMaker.makeRouteByName(['pages', 'page'], { slug: 'new-page' });
  }

}
```

 - Usage with pipe:

```html
<a [routerLink]="'pages.page' | makeRoute: { slug: 'new-page' }">My Link</a>
```
 - alternative variant:

```html
<a [routerLink]="['pages', 'page'] | makeRoute: { slug: 'new-page' }">My Link</a>
```
