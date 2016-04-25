import {it, expect, beforeEachProviders, injectAsync, describe, TestComponentBuilder,
  MockApplicationRef} from 'angular2/testing';
import {APP_BASE_HREF, ROUTER_PRIMARY_COMPONENT, ROUTER_PROVIDERS} from 'angular2/router';
import {Injectable, Component, provide, ApplicationRef} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {InputComponent} from './input.component';
import {Optimization} from './optimization';
import {LoggerService} from '../../blocks/logger.service';

@Component({
  selector: 'test',
  templateUrl: 'app/home/input/input.html',
  directives: [InputComponent, FORM_DIRECTIVES]
})

// let optimizationInfo = new ControlGroup({
//   symbols: new Control(['GOOG', 'FB', 'HP']),
//   startDate: new Control('01-01-12'),
//   endDate: new Control('03-20-16'),
//   initialInvestment: new Control(1000)
// });

@Injectable()
class TestComponent {
  active = true;
  model = new Optimization(['GOOG', 'FB', 'HP'], // need to decide how to handle
                           '01-01-12',
                           '03-20-16',
                           1000);
}

describe('InputComponent with a valid model', () => {
  beforeEachProviders(() => [
    LoggerService,
    ROUTER_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: InputComponent }),
    provide(ApplicationRef, { useClass: MockApplicationRef }),
    provide(APP_BASE_HREF, { useValue: '/' }),
  ]);

  it('should have a user input panel titled "Add Stocks"',
     injectAsync([TestComponentBuilder],
                 (tcb: TestComponentBuilder) => {
                   return tcb.createAsync(TestComponent).then((fixture) => {
                     fixture.detectChanges();
                     let compiled = fixture.debugElement.nativeElement;
                     expect(compiled).toBeDefined();
                     expect(compiled.querySelector('.panel'))
                       .not.toBeNull();
                     expect(compiled.querySelector('.panel-title'))
                       .toHaveText('Add Stocks');
                   });
                 }));

  it('should have a GOOG, FB, and HP as default stock symbols',
     injectAsync([TestComponentBuilder],
                 (tcb: TestComponentBuilder) => {
                   return tcb.createAsync(TestComponent).then((fixture) => {
                     fixture.detectChanges();
                     let compiled = fixture.debugElement.nativeElement;
                     expect(compiled).toBeDefined();
                     expect(compiled.querySelector('.panel-title'))
                       .toHaveText('Add Stocks');
                   });
                 }));

  it('should have four form fields and an optimize button',
     injectAsync([TestComponentBuilder],
                 (tcb: TestComponentBuilder) => {
                   return tcb.createAsync(TestComponent).then((fixture) => {
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
                       .not.toBeNull();
                   });
                 }));
});

describe('InputComponent with an invalid model', () => {
  beforeEachProviders(() => [
    LoggerService,
    ROUTER_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: InputComponent }),
    provide(ApplicationRef, { useClass: MockApplicationRef }),
    provide(APP_BASE_HREF, { useValue: '/' }),
  ]);

  it('should raise an alert when the "ticker symbols" field is empty',
     injectAsync([TestComponentBuilder],
                 (tcb: TestComponentBuilder) => {
                   console.log('tcb:', tcb);
                   return tcb.createAsync(TestComponent).then((fixture) => {
                     fixture.detectChanges();
                     fixture.componentInstance.model.symbols = null;
                     let compiled = fixture.debugElement.nativeElement;
                     expect(compiled.querySelector('.alert'))
                       .toHaveText('Enter at least two ticker symbols.');
                   });
                 }));

  it('should raise an alert when the "start date" field is empty',
     injectAsync([TestComponentBuilder],
                 (tcb: TestComponentBuilder) => {
                   return tcb.createAsync(TestComponent).then((fixture) => {
                     fixture.detectChanges();
                     fixture.componentInstance.model.startDate = null;
                     console.log('model', fixture.componentInstance.model);
                     console.log('startDate', fixture.componentInstance.model.startDate);
                     let compiled = fixture.nativeElement;
                     console.log('fixture', fixture.nativeElement);
                     console.log('input.ng-dirty', compiled.querySelector('input.ng-dirty'));
                     console.log('div.alert:not([hidden])', compiled.querySelector('div.alert:not([hidden])'));

                     expect(compiled.querySelector('input.ng-dirty'))
                       .not.toBeNull();
                       // .toHaveText('Enter a date in form mm-dd-yy.');
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
                       .toHaveText('Enter an initial investment in dollars.');
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
