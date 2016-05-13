import { Component } from '@angular/core';
import { RouterOutlet, RouteConfig, RouteDefinition } from '@angular/router-deprecated';

import { APP_ROUTES } from './app.routes';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'stocks-app',
  templateUrl: 'app/stocks-app.component.html',
  directives: [RouterOutlet, NavbarComponent],
  styleUrls: ['app/stocks-app.component.css']
})
@RouteConfig(APP_ROUTES)
export class StocksAppComponent {
  public appRoutes: RouteDefinition[];

  constructor() {
    this.appRoutes = APP_ROUTES;
  }
}
