import {Injectable, Component, OnInit, Output, EventEmitter} from '@angular/core';
/*import {
  FormBuilder,
  Validators,
  Control,
  ControlGroup,
  FORM_DIRECTIVES,
   } from '@angular/common';*/
import {NgForm} from '@angular/forms';
import {FormData} from './formdata';
import {SymbolsValidator} from './symbols.validator';
import {OptimizerDataService} from '../optimizer-data.service';

@Component({
  moduleId: module.id,
  selector: 'user-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.css']
})

@Injectable()
export class InputComponent implements OnInit {
  
  @Output() onSubmit = new EventEmitter();
  x: number = 0;

  model = new FormData('AAPL, GOOG, FB', '01/01/2012', '03/20/2016', '1000');

  constructor() {//public http: Http, private builder: FormBuilder, private optimizerDataService: OptimizerDataService) {
    /*this.symbols = new Control(
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
    });*/
    //this.model = new FormData('AAPL, GOOG, FB', '01/01/2012', '03/20/2016', '1000')
  }
  submitData() {
    let query = {symbols: [], startDate: '', endDate: '', initialInvestment: ''};
    // Turn string of stocks, into array of strings
    // ex: 'AAPL, GOOG, FB' --> ['AAPL', 'GOOG', 'FB']
    query.symbols = this.model.symbols.replace(/ /g, '').split(',');
    query.startDate = this.model.startDate;
    query.endDate = this.model.endDate;
    query.initialInvestment = this.model.initialInvestment;

    this.onSubmit.emit(query);
  }

  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
  }
};
