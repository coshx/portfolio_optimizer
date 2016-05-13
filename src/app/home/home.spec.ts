import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { Inject, Injector } from '@angular/core/index';
import { Component, Injectable } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { HomeComponent } from './home.component';

// let optimizationInfo = new ControlGroup({
//   symbols: new Control(['GOOG', 'FB', 'HP']),
//   startDate: new Control('01-01-12'),
//   endDate: new Control('03-20-16'),
//   initialInvestment: new Control(1000)
// });

// Test DOM interactions
describe('The HomeComponent together with the DOM', () => {
  beforeEachProviders(() => [
    TestComponentBuilder,
    HomeComponent
  ]);

  it('should have three child components', inject([TestComponentBuilder], (tcb) => {
    var html = `<user-input></user-input><barchart></barchart><results-table></results-table>`;
    tcb.overrideTemplate(html);
    return tcb.createAsync(HomeComponent).then(fixture => {
      let home = fixture.componentInstance;
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection
      expect(element.querySelector('user-input')).not.toBeNull();
    })
      .catch(e => console.log(e));
  }));



  // beforeEachProviders(() => [
  //   ROUTER_PROVIDERS,
  //   provide(ROUTER_PRIMARY_COMPONENT, { useValue: HomeComponent }),
  //   provide(ApplicationRef, { useClass: MockApplicationRef }),
  //   provide(APP_BASE_HREF, { useValue: '/' }),
  // ]);

  // it('should contain the user input, barchart, and results table components.', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
  //   return tcb.createAsync(TestComponent).then((fixture) => {
  //     fixture.detectChanges();
  //     let compiled = fixture.debugElement.nativeElement;
  //     expect(compiled).toBeDefined();
  //     console.log(compiled);
  //     expect(compiled.querySelector('user-inpt'))
  //       .not.toBeNull();
  //     expect(compiled.querySelector('barchart'))
  //       .not.toBeNull();
  //     expect(compiled.querySelector('results-table'))
  //       .not.toBeNull();
  //   });
  // }));
});
