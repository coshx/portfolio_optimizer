import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OptimizerComponent } from './optimizer.component';

describe('Component: Optimizer', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [OptimizerComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the optimizer component.', inject([OptimizerComponent],
      (component: OptimizerComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create three panels.', inject([], () => {
    return builder.createAsync(OptimizerComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let childNodes = fixture.debugElement.childNodes;
        expect(childNodes.length).toEqual(3);

        let inputPanel = fixture.debugElement.query(By.css('user-input'));
        expect(inputPanel).toBeTruthy();
        let barchartPanel = fixture.debugElement.query(By.css('barchart'));
        expect(barchartPanel).toBeTruthy();
        let resultsTablePanel = fixture.debugElement.query(By.css('results-table'));
        expect(resultsTablePanel).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <optimizer></optimizer>
  `,
  directives: [OptimizerComponent]
})
class OptimizerComponentTestController {
}

