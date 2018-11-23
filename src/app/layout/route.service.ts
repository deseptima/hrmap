import { Route as ngRoute, Routes } from '@angular/router';

import { NormalComponent } from './normal/normal.component';

/**
 * Provides helper methods to create routes.
 */
export class Route {

  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return {Route} The new route using shell as the base.
   */
  static normalLayout(routes: Routes): ngRoute {
    return {
      path: '',
      component: NormalComponent,
      children: routes,
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
    };
  }

}
