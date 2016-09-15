import {Injectable, Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {SymbolsValidator} from './symbols.validator';

@Component({
  selector: 'user-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.css']
})

@Injectable()
export class InputComponent implements OnInit {

  @Output() submitData = new EventEmitter();
  @Input() loading: number;

  optimizeForm: FormGroup;

  diagnosticData;

  constructor() {
    this.optimizeForm = new FormGroup({
      symbols: new FormControl(
        'AAPL, GOOG, FB',
        Validators.compose([Validators.required, SymbolsValidator.tooFewSymbols])
        ),
      startDate: new FormControl(
        '01/01/2012',
        Validators.compose([Validators.required, Validators.pattern('[0-9]{2}\/[0-9]{2}\/[0-9]{4}')])
        ),
      endDate: new FormControl(
        '03/20/2016',
        Validators.compose([Validators.required, Validators.pattern('[0-9]{2}\/[0-9]{2}\/[0-9]{4}')])
        ),
      initialInvestment: new FormControl(
        '1000',
        Validators.compose([Validators.required])
        )
    });
  }
  onSubmit(form) {
    let query = {symbols: [], startDate: '', endDate: '', initialInvestment: ''};
    // Turn string of stocks, into array of strings
    // ex: 'AAPL, GOOG, FB' --> ['AAPL', 'GOOG', 'FB']
    // This is the format that the backend requires
    query.symbols = form.symbols.replace(/ /g, '').split(',');
    query.startDate = form.startDate;
    query.endDate = form.endDate;
    query.initialInvestment = form.initialInvestment;
    this.diagnosticData = query;

    this.submitData.emit(query);
  }

  get diagnostic() { return JSON.stringify(this.diagnosticData); }

  ngOnInit() {
  }
};
