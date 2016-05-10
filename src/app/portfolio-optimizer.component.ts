import { Component } from '@angular/core';
import { RouterOutlet, RouteConfig, RouteDefinition } from '@angular/router-deprecated';

import { APP_ROUTES } from './app.routes';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TodolistComponent } from './todolist/todolist.component';
import { SimplebindComponent } from './simplebind/simplebind.component';


@Component({
  selector: 'portfolio-optimizer-app',
  templateUrl: 'app/portfolio-optimizer.component.html',
  directives: [RouterOutlet, NavbarComponent],
  styleUrls: ['app/portfolio-optimizer.component.css']
})
@RouteConfig(APP_ROUTES)
export class PortfolioOptimizerAppComponent {
  public appRoutes: RouteDefinition[];

  constructor() {
    this.appRoutes = APP_ROUTES;
  }
}
