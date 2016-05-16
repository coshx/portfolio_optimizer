import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import {
  FormBuilder,
  Validators,
  Control,
  ControlGroup,
  FORM_DIRECTIVES} from '@angular/common';
import { Http, HTTP_PROVIDERS, ConnectionBackend } from '@angular/http';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';

describe('Component: Input', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [
    InputComponent,
    HTTP_PROVIDERS,
    Http,
    ConnectionBackend
  ]);

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should create four form fields with default values.', inject([InputComponent], (inputComponent: InputComponent) => {
    let symbols = inputComponent.form.controls['symbols'];
    expect(symbols.value).toEqual('AAPL, GOOG, FB');
    let startDate = inputComponent.form.controls['startDate'];
    expect(startDate.value).toEqual('01/01/2012');
    let endDate = inputComponent.form.controls['endDate'];
    expect(endDate.value).toEqual('03/20/2016');
    let initialInvestment = inputComponent.form.controls['initialInvestment'];
    expect(initialInvestment.value).toEqual('1000');
  }));

  it('should update form fields.', inject([], () => {
    return builder.createAsync(InputComponent).then((fixture: ComponentFixture<any>) => {
      const element = fixture.nativeElement;
      fixture.componentInstance.symbols = new Control('SPY');
      fixture.detectChanges();
      expect(element.querySelectorAll('input')).toEqual('SPY');
        // let childNodes = fixture.debugElement.childNodes;
        // expect(childNodes.length).toEqual(3);

        // let inputPanel = fixture.debugElement.query(By.css('user-input'));
        // expect(inputPanel).toBeTruthy();
        // let barchartPanel = fixture.debugElement.query(By.css('barchart'));
        // expect(barchartPanel).toBeTruthy();
        // let resultsTablePanel = fixture.debugElement.query(By.css('results-table'));
        // expect(resultsTablePanel).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <user-input></user-input>
  `,
  directives: [InputComponent]
})
class InputComponentTestController {
}
