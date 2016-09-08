import { PortfolioOptimizerPage } from './app.po';

describe('The portfolio optimizer app', function() {
  let page: PortfolioOptimizerPage;

  beforeEach(() => {
    page = new PortfolioOptimizerPage();
  });

  it('should have the correct title.', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Coshx Finance Tools');
  });

  it('should have three panels with correct titles.', () => {
    page.navigateTo();
    expect(page.getPanelTitles()).toEqual(['Add Stocks', 'Optimal Allocations Chart', 'Results Table']);
  });

  it('should have a default allocations chart.', () => {
    page.navigateTo();
    expect(page.getAllocationsChart()).toBeTruthy();
    // TODO: Add more verification if possible
  });

  it('should have a default results table.', () => {
    page.navigateTo();
    expect(page.getResultsTableHeader()).toEqual(['Stock', 'Starting Value', 'Ending Value', 'Sharpe Ratio']);
    // TODO: Verify correct values: {"FB":0.4510450475179859,"AAPL":0,"GOOG":0.5489549524820141}
  });

  /*
  it('should have the correct default form text', () => {
    page.navigateTo();
    expect(page.getTickerSymbols()).toEqual('AAPL, GOOG, FB');
    expect(page.getStartDate()).toEqual('01/01/2012');
    expect(page.getEndDate()).toEqual('03/20/2016');
    expect(page.getInitialInvestment()).toEqual('1000');
  });
*/
});
