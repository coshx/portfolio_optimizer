import {Injectable, Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {
  FormBuilder,
  Validators,
  Control,
  ControlGroup,
  FORM_DIRECTIVES} from 'angular2/common';

import {SymbolsValidator} from './symbols.validator';
import {BarchartComponent} from './barchart/barchart.component';
import {ResultsTableComponent} from './results-table/results-table.component';

@Component({
  selector: 'user-input',
  templateUrl: 'app/home/input/input.html',
  styleUrls: ['app/home/input/input.css'],
  providers: [HTTP_PROVIDERS],
  directives: [FORM_DIRECTIVES, BarchartComponent, ResultsTableComponent]
})

@Injectable()
export class InputComponent {
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
      '01-01-12',
      Validators.compose([Validators.required,
                          Validators.pattern('[0-9]{2}\-[0-9]{2}\-[0-9]{2}')])
    );

    this.endDate = new Control(
      '03-20-16',
      Validators.compose([Validators.required,
                          Validators.pattern('[0-9]{2}\-[0-9]{2}\-[0-9]{2}')])
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

  submitData() {
    this.form.value.symbols = this.symbols.value.replace(/ /g, '').split(',');
    this.http.post('http://localhost:8000', JSON.stringify(this.form.value))
      .subscribe(
        data => this.response = data.json(),
        err => console.log(err)
      );
  }
};
