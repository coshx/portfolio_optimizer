import {Component, Input} from '@angular/core';

@Component({
  selector: 'results-table',
  templateUrl: 'results-table.component.html'
})

export class ResultsTableComponent{
  @Input() tableRows;
  @Input() highlightLastRow;
}
