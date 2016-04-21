import {it, expect, beforeEachProviders, injectAsync, describe, TestComponentBuilder,
  MockApplicationRef} from 'angular2/testing';
import {APP_BASE_HREF, ROUTER_PRIMARY_COMPONENT, ROUTER_PROVIDERS} from 'angular2/router';
import {Injectable, Component, provide, ApplicationRef} from 'angular2/core';
import {InputComponent} from './input.component';
import {BarchartComponent} from './barchart/barchart.component';
import {ResultsTableComponent} from './results-table/results-table.component';
import {Optimization} from './optimization';
import {LoggerService} from '../../blocks/logger.service';

@Component({
  selector: 'test',
  templateUrl: 'app/home/input/input.html',
  directives: [InputComponent, BarchartComponent, ResultsTableComponent]
})

@Injectable()
class TestComponent {
  active = true;
  model = new Optimization(['GOOG', 'FB', 'HP'], // need to decide how to handle
                           '01-01-12',
                           '03-20-16',
                           1000);
}

describe('InputComponent', () => {
  beforeEachProviders(() => [
    LoggerService,
    ROUTER_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: InputComponent }),
    provide(ApplicationRef, { useClass: MockApplicationRef }),
    provide(APP_BASE_HREF, { useValue: '/' }),
  ]);

  it('should have a user input panel',
     injectAsync([TestComponentBuilder],
                 (tsb: TestComponentBuilder) => {
                   return tsb.createAsync(TestComponent).then((fixture) => {
                     fixture.detectChanges();
                     let compiled = fixture.debugElement.nativeElement;
                     expect(compiled).toBeDefined();
                     expect(compiled.querySelector('input[ngcontrol="symbols"]'))
                       .not.toBeNull();
                     expect(compiled.querySelector('input[ngcontrol="startDate"]'))
                       .not.toBeNull();
                     expect(compiled.querySelector('input[ngcontrol="endDate"]'))
                       .not.toBeNull();
                     expect(compiled.querySelector('input[ngcontrol="initialInvestment"]'))
                       .not.toBeNull();
                   });
                 }));
});
