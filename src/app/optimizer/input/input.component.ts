import {Injectable, Component, OnInit} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {
  FormBuilder,
  Validators,
  Control,
  ControlGroup,
  FORM_DIRECTIVES} from '@angular/common';

import {SymbolsValidator} from './symbols.validator';
import {BarchartComponent} from './barchart/barchart.component';
import {ResultsTableComponent} from './results-table/results-table.component';

@Component({
  moduleId: module.id,
  selector: 'user-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.css'],
  providers: [HTTP_PROVIDERS],
  directives: [FORM_DIRECTIVES, BarchartComponent, ResultsTableComponent]
})

@Injectable()
export class InputComponent implements OnInit{
  response;
  form: ControlGroup;

  symbols: Control;
  startDate: Control;
  endDate: Control;
  initialInvestment: Control;

  constructor(public http: Http, private builder: FormBuilder) {
    this.symbols = new Control(
      'AAPL, GOOG, FB',
      Validators.compose([Validators.required,
                          SymbolsValidator.tooFewSymbols])
    );

    this.startDate = new Control(
      '01/01/2012',
      Validators.compose([Validators.required,
                          Validators.pattern('[0-9]{2}\/[0-9]{2}\/[0-9]{4}')])
    );

    this.endDate = new Control(
      '03/20/2016',
      Validators.compose([Validators.required,
                          Validators.pattern('[0-9]{2}\/[0-9]{2}\/[0-9]{4}')])
    );

    this.initialInvestment = new Control(
      '1000',
      Validators.compose([Validators.required])
    );

    this.form = builder.group({
      symbols: this.symbols,
      startDate: this.startDate,
      endDate: this.endDate,
      initialInvestment: this.initialInvestment
    });
  }

  submitData(inputForm: ControlGroup) {
    inputForm.value.symbols = this.symbols.value.replace(/ /g, '').split(',');
    this.http.post('http://stocks.coshx.com/backend', JSON.stringify(inputForm.value))
      .subscribe(
        data => this.response = data.json(),
        err => console.log(err)
      );
  }

  get diagnostic() { return JSON.stringify(this.response); }

  ngOnInit() {
  }
};
