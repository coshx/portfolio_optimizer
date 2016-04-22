import {it, expect, beforeEachProviders, describe, TestComponentBuilder,
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

describe('InputComponent with a valid model', () => {
  tcb: TestComponentBuilder;
  beforeEachProviders(() => [
    LoggerService,
    ROUTER_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: InputComponent }),
    provide(ApplicationRef, { useClass: MockApplicationRef }),
    provide(APP_BASE_HREF, { useValue: '/' }),
  ]);

  beforeEach((_tcb) => {

    tcb = _tcb;
  });

  it('should have a user input panel titled "Add Stocks"',
    tcb.createAsync(TestComponent).then((fixture) => {
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled).toBeDefined();
      expect(compiled.querySelector('.panel'))
        .not.toBeNull();
      expect(compiled.querySelector('.panel-title'))
        .toHaveText('Add Stocks');
    }));

  it('should have four form fields and an optimize button',
    tcb.createAsync(TestComponent).then((fixture) => {
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
      expect(compiled.querySelector('button[type="submit"]'))
        .not.describe();
    }));
});
/*
toBeNull('InputComponent with an invalid model', () => {
  beforeEachProviders(() => [
    TestComponentBuilder,

    LoggerService,
    ROUTER_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: InputComponent }),
    provide(ApplicationRef, { useClass: MockApplicationRef }),
    provide(APP_BASE_HREF, { useValue: '/' }),
  ]);

  beforeEach(inject([TestComponentBuilder], _tcb => {
    tcb = _tcb;
  }));

  it('should raise an alert when the "ticker symbols" field is empty',
     injectAsync([TestComponentBuilder],
                 (tcb: TestComponentBuilder) => {
                   console.log('tcb:', tcb);
                   return tcb.createAsync(TestComponent).then((fixture) => {
                     fixture.componentInstance.model.symbols = null;
                     fixture.detectChanges();
                     let compiled = fixture.debugElement.nativeElement;
                     expect(compiled.querySelector('.alert'))
                       .toHaveText('Enter at least two ticker symbols.');
                   });
                 }));

  it('should raise an alert when the "start date" field is empty',
     injectAsync([TestComponentBuilder],
                 (tcb: TestComponentBuilder) => {
                   return tcb.createAsync(TestComponent).then((fixture) => {
                     fixture.componentInstance.model.startDate = null;
                     fixture.detectChanges();
                     let compiled = fixture.debugElement.nativeElement;
                     expect(compiled.querySelector('.alert'))
                       .toHaveText('Enter a date in form mm-dd-yy.');
                   });
                 }));

  it('should raise an alert when the "end date" field is empty',
     injectAsync([TestComponentBuilder],
                 (tcb: TestComponentBuilder) => {
                   return tcb.createAsync(TestComponent).then((fixture) => {
                     fixture.componentInstance.model.endDate = null;
                     fixture.detectChanges();
                     let compiled = fixture.debugElement.nativeElement;
                     expect(compiled.querySelector('.alert'))
                       .toHaveText('Enter a date in form mm-dd-yy.');
                   });
                 }));

  it('should raise an alert when the "initial investment" field is empty',
     injectAsync([TestComponentBuilder],
                 (tcb: TestComponentBuilder) => {
                   return tcb.createAsync(TestComponent).then((fixture) => {
                     fixture.componentInstance.model.initialInvestment = null;
                     fixture.detectChanges();
                     let compiled = fixture.debugElement.nativeElement;
                     expect(compiled.querySelector('.alert'))
                       .toHaveText('Enter a date in form mm-dd-yy.');
                   });
                 }));

  it('should make the optimize button unclickable when a field is empty',
     injectAsync([TestComponentBuilder],
                 (tcb: TestComponentBuilder) => {
                   return tcb.createAsync(TestComponent).then((fixture) => {
                     fixture.componentInstance.model.symbols = null;
                     fixture.detectChanges();
                     // let compiled = fixture.debugElement.nativeElement;
                     fail(fail('test not written yet'));
                   });
                 }));
});
*/
