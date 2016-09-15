import { browser, element, by } from 'protractor/globals';

export class PortfolioOptimizerPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('a.navbar-brand')).getText();
  }

  getPanelTitles() {
    return element.all(by.css('.panel-title')).getText();
  }

  getTickerSymbols() {
    return element(by.css('input[ngcontrol="symbols"]')).getText();
  }

  getStartDate() {
    return element(by.css('input[ngcontrol="startDate"]')).getText();
  }

  getEndDate() {
    return element(by.css('input[ngcontrol="endDate"]')).getText();
  }

  getInitialInvestment() {
    return element(by.css('input[ngcontrol="initialInvestment"]')).getText();
  }

  getAllocationsChart() {
    return element(by.css('svg')).getSize();
  }

  getResultsTableHeader() {
    return element(by.css('thead')).all(by.css('th')).getText();
  }

  getResultsTableBody() {
    return element(by.css('tbody')).all(by.css('tr')).getText();
  }
}
