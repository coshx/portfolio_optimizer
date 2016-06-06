import { Component, OnInit } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { OptimizerComponent } from './optimizer/optimizer.component';


@Component({
  moduleId: module.id,
  selector: 'stocks-app',
  templateUrl: 'stocks.component.html',
  styleUrls: ['stocks.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/optimizer', component: OptimizerComponent}
])
export class StocksAppComponent implements OnInit {
  constructor(private router: Router) {}
  siteName = 'Coshx Finance Tools';

  ngOnInit() {
    this.router.navigate(['/optimizer']);
  }
}
