import {Injectable, Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import { Optimization } from './optimization';

@Component({
  selector: 'user-input',
  templateUrl: 'app/home/input/input.html',
  styleUrls: ['app/home/input/input.css'],
  providers: [HTTP_PROVIDERS]
})

@Injectable()
export class InputComponent {
  constructor(public http: Http) { }
  response;
  submitted = false;
  active = true;
  model = new Optimization(['GOOG', 'FB', 'HP'], // need to decide how to handle
                           '01-01-12',
                           '03-20-16',
                           1000);

  newOptimization() {
    this.model = new Optimization([''], '', '', this.model.initialInvestment);
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  onSubmit() {
    this.submitted = true;
    this.http.post('http://127.0.0.1:8001', JSON.stringify(this.model))
      .subscribe(
        data => this.response = data.json(),
        err => console.log(err)
      );
  }

  get diagnostic() { return JSON.stringify(this.response); }
}
