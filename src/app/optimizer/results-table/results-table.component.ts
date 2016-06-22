import {Component, OnInit, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'results-table',
  templateUrl: 'results-table.component.html'
})

export class ResultsTableComponent{
	@Input() tableRows;
	@Input() highlightLastRow;
}
