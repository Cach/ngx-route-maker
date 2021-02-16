# NgxRouteMaker

This library for generating routes

## Install

```bash
$ npm install ngx-route-maker --save
```

Add package to NgModule imports:

```typescript
import { NgxRouteMakerConfig, NgxRouteMakerModule } from 'ngx-route-maker';

const routesConfig: NgxRouteMakerConfig = {
  routes: {
    home: '/',
    dashboard: '/dashboard',
    pages: {
      _path: 'pages',
      page: '/{slug}',
      anotherPage: '/another/{slug}'
    }
  }
};

@NgModule({
  ...
  NgxRouteMakerModule.forRoot(routesConfig),
  ...
})
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
    return this.routeMaker.make('pages.page', { slug: 'new-page' });
  }

  public getUrlByArray(): string {
    return this.routeMaker.make(['pages', 'page'], { slug: 'new-page' });
  }

}
```

## Usage with service

 - From string: `/pages/new-page`
 
```typescript
this.routeMaker.make('pages.page', { slug: 'new-page' });
```

 - From array: `/pages/new-page`
 
```typescript
this.routeMaker.make(['pages', 'page'], { slug: 'new-page' });
```

 - With default route for empty result: `/home`
 
```typescript
this.routeMaker.make('fake.path', {}, '/home');
```

otherwise, you'll get an error for non-existent route

## Usage with pipe:

 - From string: `/pages/new-page`

```html
<a [routerLink]="'pages.page' | makeRoute: { slug: 'new-page' }">My Link</a>
```
 - From array: `/pages/new-page`

```html
<a [routerLink]="['pages', 'page'] | makeRoute: { slug: 'new-page' }">My Link</a>
```

 - With default route for empty result: `/home`

```html
<a [routerLink]="'pages.page' | makeRoute: { slug: 'new-page' } : '/home'">My Link</a>
```

#### NgxRouteMakerConfig

| Key | Value |
| --- | --- |
| routes | NgxRouteMaker |

#### NgxRouteMaker
| Key | Value |
| --- | --- |
| _path | that's prefix which will be applied for each inside route in the same depth |
| [key: string] | `string` or `NgxRouteMaker` |
